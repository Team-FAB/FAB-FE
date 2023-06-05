import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
import { UserState } from "../interface/interface"

const initialState: UserState = {
  isLogged: false,
  name: null,
  jwt: "",
  error: "",
}

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ name: string }>) => {
      state.isLogged = true
      state.name = action.payload.name
    },
    logout: (state) => {
      state.isLogged = false
      state.name = null
    },
  },
})

export const loginUser = createAsyncThunk(
  "user/login",
  async (credentials: { email: string; password: string }) => {
    // API 호출 로그인
    const response = await fetch("api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    })

    // 서버 응답 처리
    if (!response.ok) {
      throw new Error("로그인 실패")
    }

    // JWT 토큰 받기
    const data = await response.json()
    return data.jwt
  },
)

export const { login, logout } = userSlice.actions

export default userSlice.reducer
