import { configureStore } from '@reduxjs/toolkit';
import usersReducer from './features/users/usersSlice';
import stageformReducer from './features/stageform/stageformSlice'

export const store = configureStore({
  reducer: {
    users: usersReducer,
    stageform: stageformReducer,
  },
});
