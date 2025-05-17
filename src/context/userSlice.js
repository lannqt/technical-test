import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export const fetchUsers = createAsyncThunk(
  'users/fetchUsers',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users')
    return await response.json()
  }
)

const userSlice = createSlice({
  name: 'users',
  initialState: {
    list: [],
    status: 'idle',
    error: null
  },
  reducers: {
    addUser: (state, action) => {
      const newUser = action.payload
      newUser.id = state.list.length + 1
      state.list.push(newUser)
    },
    updateUser: (state, action) => {
      const updatedUser = action.payload
      const index = state.list.findIndex(u => u.id === updatedUser.id)
      if (index !== -1) {
        state.list[index] = updatedUser
      }
    },
    deleteUser: (state, action) => {
      state.list = state.list.filter(u => u.id !== action.payload)
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.list = action.payload
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})

export const { addUser, updateUser, deleteUser } = userSlice.actions
export default userSlice.reducer

