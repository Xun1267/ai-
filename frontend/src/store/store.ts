import { configureStore } from '@reduxjs/toolkit'
import authReducer from './slices/authSlice'
import chatReducer from './slices/chatSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // 忽略这些 action types 的序列化检查
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
        // 忽略这些路径的序列化检查
        ignoredPaths: [],
      },
    }),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch