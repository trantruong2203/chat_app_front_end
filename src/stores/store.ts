import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import friendshipReducer from '../features/friendship/friendshipSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    friendship: friendshipReducer,
  },
});

// Khai báo các kiểu type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
