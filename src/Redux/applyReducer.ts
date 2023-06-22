import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { applyPost, fetchApplyStatus } from "../components/Apply/applyApi";
import { ApplyProps } from "../interface/interface";
import { userMyFromApplicants, userMyToApplicants } from "../api";

interface ThunkArg {
  userToken: string
  postId: number
}

interface ApplyState {
  applyStatus: boolean
  applyPosts: ApplyProps[]
  totalCount: number
}

const initialState: ApplyState = {
  applyStatus: false,
  totalCount: 0,
  applyPosts: [],
}

export const postApplication = createAsyncThunk<
  boolean, 
  ThunkArg
>(
  'apply/postApplication',
  async ({ userToken, postId }, thunkAPI) => {
    try {
      const response = await applyPost(userToken, postId)
      return response.applyStatus
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const getApplicationStatus = createAsyncThunk<
  boolean, 
  ThunkArg
>(
  'apply/getApplicationStatus',
  async ({ userToken, postId }, thunkAPI) => {
    try {
      const response = await fetchApplyStatus(userToken, postId)
      return response
    } catch (error) {
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const fetchData = createAsyncThunk<
  {applyPageList: ApplyProps[], totalCount: number}, // Return type
  { showApply: boolean, currentPage: number, userToken: string } // Argument type
>(
  'apply/fetchData',
  async ({showApply, currentPage, userToken}, thunkAPI) => {
    const apiEndpoint = `/api/${showApply ? userMyToApplicants : userMyFromApplicants}?page=${currentPage}&size=3`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken
        },
      })

    if (!response.ok) {
      console.log(response)
      throw new Error(`서버 상태 응답 ${response.status}`)
    }

    const responeData = await response.json()
    console.log(responeData.data.applyPageList)
    return { applyPageList: responeData.data.applyPageList, totalCount: responeData.data.totalCount }
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: `서버 상태 응답: ${error}` })
  }
})

const applySlice = createSlice({
  name: 'apply',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(postApplication.fulfilled, (state, action) => {
      state.applyStatus = !state.applyStatus
    })
    builder.addCase(getApplicationStatus.fulfilled, (state, action) => {
      state.applyStatus = action.payload
    })
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<{applyPageList: ApplyProps[], totalCount: number}>) => {
      state.applyPosts = action.payload.applyPageList
      state.totalCount = action.payload.totalCount
    })
  },
})

export default applySlice.reducer;