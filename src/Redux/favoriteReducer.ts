import { createSlice } from '@reduxjs/toolkit'
import { fetchFavorites } from '../components/Favorite/favoritesThunk'

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: [],
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchFavorites.fulfilled, (_state, action) => {
      return action.payload
    })
  }
})

export default favoritesSlice.reducer