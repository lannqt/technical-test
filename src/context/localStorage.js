export const loadUsers = () => {
  try {
    const serializedData = localStorage.getItem('users')
    return serializedData ? JSON.parse(serializedData) : undefined
  } catch (e) {
    console.error("Load error", e)
    return undefined
  }
}

export const saveUsers = (users) => {
  try {
    const serializedData = JSON.stringify(users)
    localStorage.setItem('users', serializedData)
  } catch (e) {
    console.error("Save error", e)
  }
}
