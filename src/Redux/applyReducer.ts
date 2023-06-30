import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit"
import { ApplyProps } from "../interface/interface"
import { userMyFromApplicants, userMyToApplicants } from "../api"

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

export const fetchData = createAsyncThunk<
  {applyPageList: ApplyProps[], totalCount: number}, 
  { showApply: boolean, currentPage: number, userToken: string } 
>(
  'apply/fetchData',
  async ({showApply, currentPage, userToken}, thunkAPI) => {
    const apiEndpoint = `/api/${showApply ? userMyToApplicants : userMyFromApplicants}?page=${currentPage}&size=3`

    try {
      const response = await fetch(apiEndpoint, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: userToken
        },
      })

    if (!response.ok) {
      throw new Error(`서버 상태 응답 ${response.status}`)
    }

    const responeData = await response.json()
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
    builder.addCase(fetchData.fulfilled, (state, action: PayloadAction<{applyPageList: ApplyProps[], totalCount: number}>) => {
      state.applyPosts = action.payload.applyPageList
      state.totalCount = action.payload.totalCount
    })
  },
})

export default applySlice.reducer