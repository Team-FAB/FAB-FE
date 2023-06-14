/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Token, UserState } from "../interface/interface"
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"
import { Dispatch } from "redux"
import { RootState, AppDispatch } from "./store"
import {
  googleUserLogin,
  kakaoLogin,
  refreshApiUrl,
  userLogin,
  userRegister,
} from "../api"

const initialState: UserState = loadFromLocalStorage() || {
  isLogged: false,
  data: {
    token: {
      atk: "",
      rtk: "",
    },
  },
  signUp: false,
  kakao: false,
  google: false,
  email: "",
  status: "idle",
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

  if (splitToken.length < 2) {
    console.error("토큰 형식 오류:", token.atk)
    throw new Error("Token format error")
  }

  //한시간으로 설정 되어있음
  try {
    const tokenPayload = JSON.parse(atob(splitToken[1]))
    const expirationTime = tokenPayload.exp * 1000
    const currentTime = new Date().getTime()

    if (currentTime > expirationTime) {
      await dispatch(refreshToken({ refreshToken: token.rtk }))
    }
  } catch (error) {
    console.error("Error decoding access token:", error)
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
      return data
    } catch (error: unknown) {
      console.error("login failed", error)
      if (error instanceof Error) {
        return rejectWithValue(error.message)
      }
      return rejectWithValue("오류")
    }
  },
)

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
  { token: Token },
  string,
  { dispatch: AppDispatch; state: RootState }
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

    console.log("카카오 보내는 코드")
    return { token: data.data.token }
  } catch (error: any) {
    return rejectWithValue(error.message)
  }
})

export const googleloginUser = createAsyncThunk<
  { token: Token },
  void,
  { dispatch: Dispatch; state: RootState }
>("login/oauth2/google", async () => {
  try {
    const response = await fetch(googleUserLogin, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    const { token } = data.data

    return { token }
  } catch (error) {
    console.error("로그인 실패")
    throw error
  }
})

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (userInfo: { email: string; password: string; nickname: string }) => {
    try {
      await fetch(`/api/${userRegister}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      })
    } catch (error) {
      console.error("회원가입 실패")
      throw error
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
      // state.email = action.payload.email
      saveToLocalStorage(state)
    },
    logout: (state) => {
      state.isLogged = false
      state.data.token = { atk: "", rtk: "" }
      localStorage.removeItem("email")
    },
    signUp: (state) => {
      state.signUp = false
    },
    kakaoLogin: (state, action) => {
      state.isLogged = false
      state.data.token = action.payload.data.token
    },
    googleLogin: (state, action) => {
      state.isLogged = false
      state.data.token = action.payload.data.token
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.data.token = action.payload.data.token
      saveToLocalStorage(state)
    })

    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false
    })

    builder.addCase(registerUser.fulfilled, (state) => {
      state.signUp = true
    })

    builder.addCase(registerUser.rejected, (state) => {
      state.signUp = false
    })

    builder.addCase(kakaologinUser.fulfilled, (state, action) => {
      state.kakao = true
      state.data.token = action.payload.token
      saveToLocalStorage(state)
    })

    builder.addCase(kakaologinUser.rejected, (state) => {
      state.kakao = false
    })

    builder.addCase(googleloginUser.fulfilled, (state, action) => {
      state.google = true
      state.data.token = action.payload.token
      saveToLocalStorage(state)
    })

    builder.addCase(googleloginUser.rejected, (state) => {
      state.google = false
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
