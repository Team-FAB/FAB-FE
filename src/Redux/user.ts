/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Token, UserState } from "../interface/interface"
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"
import { Dispatch } from "redux"
import { RootState, AppDispatch } from "./store"
import {
  googleLogin,
  kakaoLogin,
  refreshApiUrl,
  userLogin,
  userLogout,
  userRegister,
} from "../api"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useEffect } from "react"

const initialState: UserState = loadFromLocalStorage() || {
  isLogged: false,
  data: {
    email: "",
    token: {
      atk: "",
      rtk: "",
    },
  },
  signUp: false,
  status: "idle",
}

export function useAutoLogout() {
  const dispatch = useDispatch()
  const { token } = useSelector((state: RootState) => state.user.data)

  useEffect(() => {
    if (token && token.atk) {
      const splitToken = token.atk.split(".")
      const tokenPayload = JSON.parse(atob(splitToken[1]))
      const expirationTime = tokenPayload.exp * 1000

      const timeoutId = setTimeout(() => {
        dispatch(logout())
      }, expirationTime - new Date().getTime())

      return () => clearTimeout(timeoutId)
    }
  }, [token, dispatch])
}

export const refreshTokenIfNeeded = createAsyncThunk<
  void,
  void,
  { dispatch: AppDispatch; state: RootState }
>("api/users/refreshIfNeeded", async (_, { getState, dispatch }) => {
  const { token } = getState().user.data

  if (!token || !token.atk) {
    console.error("토큰 없음")
    throw new Error("No token")
  }

  const splitToken = token.atk.split(".")

  try {
    const tokenPayload = JSON.parse(atob(splitToken[1]))
    const expirationTime = tokenPayload.exp * 1000
    const currentTime = new Date().getTime()

    if (currentTime > expirationTime) {
      await dispatch(refreshToken({ refreshToken: token.rtk }))
    } else {
      dispatch(logout())
    }
  } catch (error) {
    console.error(error)
    throw error
  }
})

export const loginUser = createAsyncThunk<
  UserState,
  { email: string; password: string },
  { dispatch: Dispatch; state: RootState }
>(
  "api/users/login",
  async (
    credentials: { email: string; password: string },
    { rejectWithValue },
  ) => {
    try {
      const response = await fetch(`/api/${userLogin}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("Login failed")
      }

      const data: UserState = await response.json()

      return { ...data, email: credentials.email }
    } catch (error: unknown) {
      console.error("login failed", error)
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("오류")
    }
  },
)

export const logOutUser = createAsyncThunk<
  UserState,
  { userToken: string },
  { dispatch: AppDispatch; rejectValue: string; state: RootState }
>("api/users/logout", async ({ userToken }, thunkApi) => {
  try {
    const response = await fetch(`/api/${userLogout}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken.toString(),
      },
    })

    if (!response.ok) {
      throw new Error("Logout failed")
    }

    const data: UserState = await response.json()

    thunkApi.dispatch(logout())

    return data
  } catch (error: unknown) {
    if (error instanceof Error) {
      return thunkApi.rejectWithValue(error.message)
    }
    return thunkApi.rejectWithValue("오류")
  }
})

export const refreshToken = createAsyncThunk<
  UserState,
  { refreshToken: string },
  { dispatch: Dispatch; state: RootState }
>(
  "api/users/refresh",
  async (credentials: { refreshToken: string }, { rejectWithValue }) => {
    try {
      const response = await fetch(`/api/${refreshApiUrl}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      if (!response.ok) {
        throw new Error("토큰 새로 고침 실패")
      }
      // 로컬스토리지에 바뀐 data 저장 하기 추가
      const data: UserState = await response.json()
      return data
    } catch (error: unknown) {
      console.error("token refresh failed", error)
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("오류")
    }
  },
)

export const kakaologinUser = createAsyncThunk<
  {
    email: string
    token: Token
  },
  { code: string },
  { dispatch: Dispatch; state: RootState }
>("/kakao", async (code, { rejectWithValue }) => {
  try {
    const response = await fetch(`/api/${kakaoLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(code),
    })

    if (!response.ok) {
      throw new Error("네트워크 응답이 올바르지 않습니다")
    }

    const data: UserState = await response.json()

    return { email: data.data.email, token: data.data.token }
  } catch (error) {
    return rejectWithValue(error)
  }
})

export const googleloginUser = createAsyncThunk<
  { 
    token: Token
    email: string
  },
  { accessToken: string },
  { dispatch: Dispatch; state: RootState }
>("login/oauth2/google", async (arg) => {
  try {
    const { accessToken } = arg
    const response = await fetch(`/api/${googleLogin}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ code: accessToken }),
    })

    const data = await response.json()
    return { token: data.data.token, email: data.data.email }
  } catch (error) {
    console.error("로그인 실패", error)
    throw error
  }
})

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (userInfo: { email: string; password: string; nickname: string }) => {
      const response = await fetch(`/api/${userRegister}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })

      if (response.status === 201) {
        return true
      } else {
        return false
      }
    },
  )

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isLogged = true
      state.data.token = action.payload.data.token
      state.email = action.payload.email
      saveToLocalStorage(state)
    },
    logout: (state) => {
      state.isLogged = false
      state.data.token = { atk: "", rtk: "" }
      state.email = ""
    },
    signUp: (state) => {
      state.signUp = false
    },
    kakaoLogin: (state, action) => {
      state.isLogged = false
      state.data.token = action.payload.data.token
      state.email = action.payload.email
      saveToLocalStorage(state)
    },
    googleLogin: (state, action) => {
      state.isLogged = false
      state.data.token = action.payload.data.token
      state.email = action.payload.email
      saveToLocalStorage(state)
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.data.token = action.payload.data.token
      state.email = action.payload.email
      saveToLocalStorage(state)
    })

    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false
      state.email = ""
    })

    builder.addCase(logOutUser.fulfilled, (state) => {
      state.isLogged = false
    })

    builder.addCase(registerUser.fulfilled, (state) => {
      state.signUp = true
    })

    builder.addCase(registerUser.rejected, (state) => {
      state.signUp = false
    })

    builder.addCase(kakaologinUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.data.token = action.payload.token
      state.email = action.payload.email
      saveToLocalStorage(state)
    })

    builder.addCase(kakaologinUser.rejected, (state) => {
      state.isLogged = false
      state.email = ""
    })

    builder.addCase(googleloginUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.data.token = action.payload.token
      state.email = action.payload.email
      saveToLocalStorage(state)
    })

    builder.addCase(googleloginUser.rejected, (state) => {
      state.isLogged = false
      state.email = ""
    })
  },
})

const storedtoken = localStorage.getItem("token")
if (storedtoken) {
  if (refreshTokenIfNeeded()) {
    userSlice.actions.logout()
  }
}

export const { logout, loginSuccess } = userSlice.actions
export default userSlice.reducer
