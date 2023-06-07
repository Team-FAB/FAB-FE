import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import { saveToLocalStorage } from "./localStorage"

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
})

store.subscribe(() => saveToLocalStorage(store.getState().user))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
