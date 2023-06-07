import { GlobalState, UserState } from "../interface/interface"

export const saveToLocalStorage = (state: UserState) => {
  try {
    const token = state.token

    if (token) {
      localStorage.setItem("user", JSON.stringify(state))
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

// 로컬스토리지 암호화
// export const saveToLocalStorage = (state: UserState) => {
//   try {
//     const token = state.token

//     if (token) {
//       const stateString = JSON.stringify(state)
//       const encryptedState = btoa(stateString)
//       localStorage.setItem("state", encryptedState)
//     }
//   } catch (error) {
//     console.warn(error)
//   }
// }

// export const loadFromLocalStorage = (): GlobalState | undefined => {
//   try {
//     const encryptedState = localStorage.getItem("state")
//     if (encryptedState === null) return undefined
//     const decryptedState = atob(encryptedState)
//     return JSON.parse(decryptedState) as GlobalState
//   } catch (error) {
//     console.warn(error)
//     return undefined
//   }
// }
