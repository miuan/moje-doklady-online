import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import userReducer from './reducers/userSlice'
import counterReducer from '../features/counter/counterSlice'
import organizationReducer from './reducers/organizationReducer'
import apolloClient from './apolloClient'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    organization: organizationReducer,
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
