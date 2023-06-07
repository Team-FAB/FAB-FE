import { GlobalState, UserState } from "../interface/interface"

export const saveToLocalStorage = (state: UserState) => {
  try {
    const token = state.token

    if (token) {
      localStorage.setItem("state", JSON.stringify(state))
    }
  } catch (error) {
    console.warn(error)
  }
}

export const loadFromLocalStorage = (): GlobalState | undefined => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) return undefined
    return JSON.parse(serializedState) as GlobalState
  } catch (error) {
    console.warn(error)
    return undefined
  }
}
