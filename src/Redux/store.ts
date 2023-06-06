import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage"
import { GlobalState } from "../interface/interface"

const persistedState = loadFromLocalStorage() as GlobalState | undefined

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
  preloadedState: persistedState,
})

store.subscribe(() => saveToLocalStorage({ user: store.getState().user }))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
