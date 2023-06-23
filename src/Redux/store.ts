import { Action, ThunkAction, ThunkDispatch, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import { saveToLocalStorage } from "./localStorage"
import savedReducer from './savedReducer'
import { useDispatch as useReduxDispatch } from 'react-redux'
import favoriteReducer from "./favoriteReducer"
import applicantReducer from './applicantReducer'
import applyReducer from "./applyReducer"
import applySavedReducer from "./applySavedReducer"

export const store = configureStore({
  reducer: {
    user: userReducer,
    saved: savedReducer,
    favorites: favoriteReducer,
    apply: applyReducer,
    applySaved: applySavedReducer,
    applicant: applicantReducer
  },
})

store.subscribe(() => saveToLocalStorage(store.getState().user))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>

export type ModifiedDispatch = ThunkDispatch<RootState, unknown, Action<string>>
export const useDispatch = () => useReduxDispatch<ModifiedDispatch>()