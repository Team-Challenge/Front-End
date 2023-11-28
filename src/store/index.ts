import { configureStore } from '@reduxjs/toolkit';
import authSlice from './auth/authSlice';
import userSettingsSlice from './userSettings/userSettingsSlice';
import modalSlice from './modalSlice';

const store = configureStore({
  reducer: {
    auth: authSlice,
    userSettings: userSettingsSlice,
    modal: modalSlice,
  },
  middleware: (getDefaultMiddleWare) => getDefaultMiddleWare().concat(),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
