import { createAsyncThunk } from "@reduxjs/toolkit"
import { RootState } from "../../Redux/store"
import { userMyFavorite } from '../../api'

export const fetchFavorites = createAsyncThunk('favorites/fetch', async (_, thunkAPI) => {
  const state = thunkAPI.getState() as RootState
  const userToken = state.user.data.token

  // 찜한 목록
  try {
    const response = await fetch(`/api/${userMyFavorite}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: userToken.atk.toString()
      },
    })

    if (!response.ok) {
      throw new Error(`서버 상태 응답 ${response.status}`)
    }

    const responseData = await response.json()

    return responseData.data
  } catch (error) {
    console.error(error)
    return thunkAPI.rejectWithValue(error)
  }
})