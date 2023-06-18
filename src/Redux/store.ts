import { Action, ThunkAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import { saveToLocalStorage } from "./localStorage"
import savedReducer from './savedReducer'
import { useDispatch as useReduxDispatch } from 'react-redux'
import favoriteReducer from "./favoriteReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    saved: savedReducer,
    favorites: favoriteReducer
  },
})

store.subscribe(() => saveToLocalStorage(store.getState().user))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export type ModifiedDispatch = ThunkDispatch<RootState, unknown, Action<string>>
export const useDispatch = () => useReduxDispatch<ModifiedDispatch>()