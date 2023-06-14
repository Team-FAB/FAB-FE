import { UserState } from "../interface/interface"

export const saveToLocalStorage = (state: UserState) => {
  try {
    const token = state.data

    if (token) {
      const stateString = JSON.stringify(state)

      localStorage.setItem("state", stateString)
    }
  } catch (error) {
    console.warn(error)
  }
}

export const loadFromLocalStorage = (): UserState | undefined => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) return undefined
    return JSON.parse(serializedState) as UserState
  } catch (error) {
    console.warn(error)
    return undefined
  }
}
