import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import userProfileSlice from './userProfile/userProfileSlice';
import storeProfileSlice from './storeProfile/storeProfileSlice';
import overlayStateSlice from './overlayStateSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    userProfile: userProfileSlice,
    storeProfile: storeProfileSlice,
    overlayState: overlayStateSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
