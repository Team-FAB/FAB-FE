import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit"
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
        "http://7e26-221-156-192-79.ngrok-free.app/api/users/login",
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
      return data.jwt
    } catch (error) {
      console.error(error)
      throw error
    }
  },
)

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (userInfo: { email: string; password: string; nickname: string }) => {
    try {
      const response = await fetch(
        "http://7e26-221-156-192-79.ngrok-free.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        },
      )

      if (!response.ok) {
        throw new Error("회원가입 실패")
      }

      const data = await response.json()
      return data.message
    } catch (error) {
      console.error(error)
    }
  },
)

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
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<string>) => {
        state.jwt = action.payload
        state.isLogged = true
      })
      .addCase(loginUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message || "로그인에 실패했습니다."
        } else {
          state.error = action.error.message || "로그인에 실패했습니다."
        }
      })
      .addCase(
        registerUser.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.name = action.payload
        },
      )
      .addCase(registerUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.message || "회원가입에 실패했습니다."
        } else {
          state.error = action.error.message || "회원가입에 실패했습니다."
        }
      })
  },
})

export const { login, logout } = userSlice.actions

export default userSlice.reducer
