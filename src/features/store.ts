import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './user/userSlice'
import counterReducer from '../features/counter/counterSlice'
import organizationReducer from './organization/organizationReducer'
import apolloClient from './apolloClient'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    organizations: organizationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          apolloClient,
        },
      },
    }),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>
