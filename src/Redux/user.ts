
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../interface/interface";
import { Token, UserState } from "../interface/interface"
import { saveToLocalStorage, loadFromLocalStorage } from "./localStorage"
import { Dispatch } from "redux"
import { RootState } from "./store"

let initialState: UserState = {
  isLogged: false,
  token: {
    atk: "",
    rtk: "",
  },
  msg: "",
  status: "idle",
  signUp: false,
  user: "",
}

const persistedState = loadFromLocalStorage()

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

if (persistedState && !isTokenExpired(persistedState.token)) {
  initialState = persistedState
}

export const loginUser = createAsyncThunk<
  { token: string; name: string },
  { email: string; password: string },
  { dispatch: Dispatch; state: RootState }
>(
  "api/users/login",
  async (
    credentials: { email: string; password: string },
    { dispatch, getState },
  ) => {
    try {
      const response = await fetch(userLogin, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      })

      const data = await response.json()
      const { token, name } = data

      dispatch(loginSuccess({ token, name }))

      saveToLocalStorage(getState().user)
      return { token, name }
    } catch (error) {
      console.error("오류", error)
      throw error
    }
  },
)

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
      console.error("회원가입 실패", error)
      throw error
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("token")
      state.isLogged = false
      state.token = { atk: "", rtk: "" }
      state.msg = ""
      state.status = "idle"
      state.signUp = false
    },
    signUp: (state) => {
      state.signUp = false
      state.msg = ""
      state.status = "idle"
    },
    loginSuccess: (state, action) => {
      state.isLogged = true
      state.token = action.payload.token
      state.status = "fulfilled"
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.token = action.payload.token
      state.status = "fulfilled"
    })

    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false
      state.msg = "로그인 실패"
      state.status = "rejected"
    })

    builder.addCase(registerUser.fulfilled, (state) => {
      state.signUp = true
      state.status = "fulfilled"
    })

    builder.addCase(registerUser.rejected, (state) => {
      state.signUp = false
      state.msg = "회원가입 실패"
      state.status = "rejected"
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
