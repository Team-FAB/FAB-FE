export const saveToLocalStorage = (state: any) => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem("state", serializedState)
  } catch (error) {
    console.warn(error)
  }
}

export const loadFromLocalStorage = () => {
  try {
    const serializedState = localStorage.getItem("state")
    if (serializedState === null) return undefined
    return JSON.parse(serializedState)
  } catch (error) {
    console.warn(error)
    return undefined
  }
}
