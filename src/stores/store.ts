import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/users/userSlice';
import friendshipReducer from '../features/friendship/friendshipSlice';
import messageReducer from '../features/messages/messageSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
    friendship: friendshipReducer,
    message: messageReducer,
  },
});

// Khai báo các kiểu type
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
