import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SavedState = Record<string, boolean>
const initialState: SavedState = {}

const savedFavoriteSlice = createSlice({
  name: 'saved',
  initialState,
  reducers: {
    setSaved(state, action: PayloadAction<{postId: number, isSaved: boolean}>) {
      const { postId, isSaved } = action.payload
      state[postId] = isSaved
    },
  },
})

export const { setSaved } = savedFavoriteSlice.actions
export default savedFavoriteSlice.reducer