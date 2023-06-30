import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ApplyProps } from '../interface/interface'
import { updateApprove, updateDelete, updateRefuse } from '../components/Apply/applyApi'

interface State {
  posts: ApplyProps[]
  approvedPosts: ApplyProps[]
  refusedPosts: ApplyProps[]
}

const initialState: State = {
  posts: [],
  approvedPosts: [],
  refusedPosts: [],
}

interface ThunkArgApprove {
  userToken: string
  otherUserId: number
  articleId: number
}

interface ThunkArgRefuse {
  userToken: string
  articleId: number
  applyId: number
}

interface ThunkArgDelete {
  userToken: string
  applyId: number
}

export const approvePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgApprove
>(
  'applicant/approvePost',
  async ({ userToken, otherUserId, articleId }: ThunkArgApprove, thunkAPI) => {
    try {
      const approvedPost = await updateApprove(userToken, otherUserId, articleId)
      return approvedPost
    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const refusePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgRefuse
>(
  'applicant/refusePost',
  async ({ userToken, applyId, articleId }: ThunkArgRefuse, thunkAPI) => {
    try {
      const refusedPost = await updateRefuse(userToken, applyId, articleId)
      return refusedPost
    } catch (error) {
      console.error('룸메이트 매칭 거절 오류', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

export const deletePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgDelete
>(
  'applicant/deletePost',
  async ({ userToken, applyId }: ThunkArgDelete, thunkAPI) => {
    try {
      const deletedPost = await updateDelete(userToken, applyId)
      return deletedPost
    } catch (error) {
      console.error('룸메이트 현황 삭제 오류', error)
      return thunkAPI.rejectWithValue(error)
    }
  }
)

const applySlice = createSlice({
  name: 'applyAction',
  initialState,
  reducers: {
    approvePost: (state, action: PayloadAction<ApplyProps>) => {
      state.approvedPosts.push(action.payload)
    },
    refusePost: (state, action: PayloadAction<ApplyProps>) => {
      state.refusedPosts.push(action.payload)
    },
    deletePost: (state, action: PayloadAction<number>) => {
      state.posts = state.posts.filter(post => post.applyId !== action.payload)
    }
  },
})

export const { approvePost, refusePost, deletePost } = applySlice.actions
export default applySlice.reducer