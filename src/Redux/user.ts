import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import { UserState } from "../interface/interface"

const initialState: UserState = {
  isLogged: false,
  name: null,
  jwt: "",
  error: "",
  status: "",
}

export const loginUser = createAsyncThunk(
  "api/users/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(
        "https://0c48-211-211-141-39.ngrok-free.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        },
      )

      if (!response.ok) {
        throw new Error("로그인 실패")
      }

      const data = await response.json()
      return { jwt: data.jwt, name: data.name }
    } catch (error) {
      console.error("오류", error)
      return {
        jwt: "",
        name: "",
      }
    }
  },
)

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (userInfo: { email: string; password: string; nickname: string }) => {
    try {
      await fetch(
        "https://0c48-211-211-141-39.ngrok-free.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        },
      )
    } catch (error) {
      console.error("회원가입 실패", error)
    }
  },
)

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false
      state.name = null
      state.jwt = ""
      state.error = ""
      state.status = ""
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLogged = true
      state.jwt = action.payload.jwt
      state.name = action.payload.name
      state.status = "fulfilled"
    })

    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false
      state.error = "로그인 실패"
      state.status = "rejected"
    })
  },
})

export const { logout } = userSlice.actions
export default userSlice.reducer
