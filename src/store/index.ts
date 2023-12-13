import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import userProfileSlice from './userProfile/userProfileSlice';
import modalSlice from './modalSlice';
import overlayStateSlice from './overlayStateSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userProfileSlice,
    modal: modalSlice,
    overlayState: overlayStateSlice,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
