import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { Token, UserState } from "../interface/interface"
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"
import { Dispatch } from "redux"
import { RootState } from "./store"
import {
  googleUserLogin,
  kakaoUserLogin,
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
  status: "idle",
  signUp: false,
  kakao: false,
  google: false,
}

export const isTokenExpired = (token: Token) => {
  if (!token || !token.atk) {
    console.error("토큰 없음")
    return true
  }

  const splitToken = token.atk.split(".")

  if (splitToken.length < 2) {
    console.error("토큰 형식 오류:", token.atk)
    return true
  }

  try {
    const tokenPayload = JSON.parse(atob(splitToken[1]))
    const expirationTime = tokenPayload.exp * 1000
    const currentTime = new Date().getTime()

    return currentTime > expirationTime
  } catch (error) {
    console.error("Error decoding access token:", error)
    return true
  }
}

export const loginUser = createAsyncThunk<
  UserState,
  { email: string; password: string },
  { dispatch: Dispatch; state: RootState }
>(
  "api/users/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(userLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data: UserState = await response.json()

      return data
    } catch (error) {
      console.error("login failed")
      throw error
    }
  },
)

export const kakaologinUser = createAsyncThunk<
  { token: string },
  void,
  { dispatch: Dispatch; state: RootState }
>("login/oauth2/kakao", async (_, { dispatch, getState }) => {
  try {
    const response = await fetch(kakaoUserLogin, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    const { token } = data.data

    dispatch(loginSuccess({ data: { token } }))

    saveToLocalStorage(getState().user)
    return { token }
  } catch (error) {
    console.error("login failed")
    throw error
  }
})

export const googleloginUser = createAsyncThunk<
  { token: string },
  void,
  { dispatch: Dispatch; state: RootState }
>("login/oauth2/google", async (_, { dispatch, getState }) => {
  try {
    const response = await fetch(googleUserLogin, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })

    const data = await response.json()
    const { token } = data

    dispatch(loginSuccess({ data: { token } }))

    saveToLocalStorage(getState().user)
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
      await fetch(userRegister, {
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
      state.status = "fulfilled"
      saveToLocalStorage(state)
    },
    logout: (state) => {
      state.isLogged = false
      state.data.token = { atk: "", rtk: "" }
      state.status = "fulfilled"
    },
    signUp: (state) => {
      state.signUp = false
      state.status = "idle"
    },
    kakaoLogin: (state) => {
      state.isLogged = false
      state.status = "idle"
    },
    googleLogin: (state) => {
      state.isLogged = false
      state.status = "idle"
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.data.token = action.payload.data.token
      state.status = "fulfilled"
      saveToLocalStorage(state)
    })

    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false
      state.status = "rejected"
    })

    builder.addCase(registerUser.fulfilled, (state) => {
      state.signUp = true
      state.status = "fulfilled"
    })

    builder.addCase(registerUser.rejected, (state) => {
      state.signUp = false
    })

    builder.addCase(kakaologinUser.fulfilled, (state) => {
      state.kakao = true
      state.status = "fulfilled"
      saveToLocalStorage(state)
    })

    builder.addCase(kakaologinUser.rejected, (state) => {
      state.kakao = false
    })

    builder.addCase(googleloginUser.fulfilled, (state) => {
      state.google = true
      saveToLocalStorage(state)
    })

    builder.addCase(googleloginUser.rejected, (state) => {
      state.google = false
    })
  },
})

const storedtoken = localStorage.getItem("token")
if (storedtoken) {
  const parsedToken = JSON.parse(storedtoken)
  if (isTokenExpired(parsedToken)) {
    userSlice.actions.logout()
  }
}

export const { logout, loginSuccess } = userSlice.actions
export default userSlice.reducer
