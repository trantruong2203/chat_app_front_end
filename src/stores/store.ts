import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});

// Khai báo các kiểu type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
