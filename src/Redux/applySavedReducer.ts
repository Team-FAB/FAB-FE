import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type SavedState = Record<string, boolean>
const initialState: SavedState = {}

const savedApplySlice = createSlice({
  name: 'applySaved',
  initialState,
  reducers: {
    setSaved(state, action: PayloadAction<{postId: number, isSaved: boolean}>) {
      const { postId, isSaved } = action.payload
      state[postId] = isSaved
    },
  },
})

export const { setSaved } = savedApplySlice.actions
export default savedApplySlice.reducer