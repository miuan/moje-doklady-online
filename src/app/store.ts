import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import userReducer from './reducers/userSlice';
import counterReducer from '../features/counter/counterSlice';
import organizationReducer from './reducers/organizationSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    counter: counterReducer,
    organization: organizationReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
