import { configureStore } from '@reduxjs/toolkit'
import { noteApi } from './api/NoteSlice'
import { setupListeners } from '@reduxjs/toolkit/query'
import {authSlice} from './api/authSlice'
import {userSlice} from './api/userSlice'

export const store = configureStore({
  reducer: {
    [noteApi.reducerPath]: noteApi.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [userSlice.reducerPath]: userSlice.reducer
  },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(noteApi.middleware)
      .concat(authSlice.middleware)
      .concat(userSlice.middleware),

})

setupListeners(store.dispatch)

