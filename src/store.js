import { configureStore } from '@reduxjs/toolkit';
import { userApi } from './services/userApi';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});
