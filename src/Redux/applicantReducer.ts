import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ApplyProps } from '../interface/interface';
import { updateApprove, updateDelete, updateRefuse } from '../components/Apply/applyApi';

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
      const approvedPost = await updateApprove(userToken, otherUserId, articleId);
      return approvedPost;
    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const refusePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgRefuse
>(
  'applicant/approvePost',
  async ({ userToken, applyId, articleId }: ThunkArgRefuse, thunkAPI) => {
    try {
      const approvedPost = await updateRefuse(userToken, applyId, articleId);
      return approvedPost;
    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const deletePostAsync = createAsyncThunk<
  boolean, 
  ThunkArgDelete
>(
  'applicant/approvePost',
  async ({ userToken, applyId }: ThunkArgDelete, thunkAPI) => {
    try {
      const approvedPost = await updateDelete(userToken, applyId);
      return approvedPost;
    } catch (error) {
      console.error('룸메이트 매칭 승인 오류', error);
      return thunkAPI.rejectWithValue(error);
    }
  }
);

const applySlice = createSlice({
  name: 'applyAction',
  initialState,
  reducers: {
    applyPost: (state, action: PayloadAction<ApplyProps>) => {
      state.posts.push(action.payload)
    },
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
  // extraReducers: (builder) => {
  //   builder.addCase(approvePostAsync.fulfilled, (state, action) => {
  //     state.approvedPosts.push(action.payload);
  //   });
  //   builder.addCase(approvePostAsync.rejected, (state, action) => {
  //     state.error = action.payload;
  //   });
  // },
})

export const { applyPost, approvePost, refusePost, deletePost } = applySlice.actions
export default applySlice.reducer;