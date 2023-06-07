import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { UserState } from "../interface/interface";

const initialState: UserState = {
  isLogged: false,
  error: "",
  status: "",
  signUp: false,
};

export const loginUser = createAsyncThunk(
  "api/users/login",
  async (credentials: { email: string; password: string }) => {
    try {
      const response = await fetch(
        "https://2d22-211-211-141-39.ngrok-free.app/api/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        }
      );

      if (!response.ok) {
        throw new Error("로그인 실패");
      }

      const data = await response.json();
      return { jwt: data.jwt, name: data.name };
    } catch (error) {
      console.error("오류", error);
      throw error;
    }
  }
);

export const registerUser = createAsyncThunk(
  "api/users/register",
  async (userInfo: { email: string; password: string; nickname: string }) => {
    try {
      const response = await fetch(
        "https://2d22-211-211-141-39.ngrok-free.app/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(userInfo),
        }
      );

      if (!response.ok) {
        throw new Error("회원가입 실패");
      }
    } catch (error) {
      console.error("회원가입 실패", error);
      throw error;
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.error = "";
      state.status = "idle";
    },
    signUp: (state) => {
      state.signUp = false;
      state.error = "";
      state.status = "idle";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state) => {
      state.isLogged = true;
      state.status = "fulfilled";
    });

    builder.addCase(loginUser.rejected, (state) => {
      state.isLogged = false;
      state.error = "로그인 실패";
      state.status = "rejected";
    });

    builder.addCase(registerUser.fulfilled, (state) => {
      state.signUp = true;
      state.status = "fulfilled";
    });

    builder.addCase(registerUser.rejected, (state) => {
      state.signUp = false;
      state.error = "회원가입 실패";
      state.status = "rejected";
    });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
