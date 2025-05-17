import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice'

const store = configureStore({
  reducer: {
    users: userReducer
  }
})

export default store

// import { configureStore } from '@reduxjs/toolkit'
// import userReducer from './userSlice'
// import { loadUsers } from './localStorage'

// const preloadedState = {
//   users: {
//     list: loadUsers() || [],
//     status: 'idle',
//     error: null
//   }
// }

// const store = configureStore({
//   reducer: {
//     users: userReducer
//   },
//   preloadedState
// })

// export default store
