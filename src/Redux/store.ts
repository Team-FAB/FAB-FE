import { Action, ThunkAction, configureStore } from "@reduxjs/toolkit"
import userReducer from "./user"
import rootReducer from "./user"
import { loadFromLocalStorage, saveToLocalStorage } from "./localStorage"

const preloadedState = loadFromLocalStorage()

export const store = configureStore({
  reducer: {
    user: userReducer,
    rootReducer,
    preloadedState,
  },
})

store.subscribe(() => saveToLocalStorage(store.getState()))

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
