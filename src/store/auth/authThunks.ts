import { createAsyncThunk } from '@reduxjs/toolkit';
import AuthService from '@/services/AuthService';
import { setAuth } from './authSlice';

export const login = createAsyncThunk(
  'accounts/signin',
  async (
    credentials: { email: string; password: string },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await AuthService.login(
        credentials.email,
        credentials.password,
      );

      localStorage.setItem('token', response.data.access_token);
      localStorage.setItem('refresh', response.data.refresh_token);
      dispatch(setAuth(true));

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data?.message || 'Помилка авторизації';
      return rejectWithValue(errorMessage);
    }
  },
);

export const registration = createAsyncThunk(
  'accounts/signup',
  async (
    credentials: {
      full_name: string | undefined;
      email: string;
      password: string;
    },
    { dispatch, rejectWithValue },
  ) => {
    try {
      const response = await AuthService.registration(
        credentials.full_name,
        credentials.email,
        credentials.password,
      );

      if (response.status === 200 && response.data.user) {
        dispatch(
          login({ email: credentials.email, password: credentials.password }),
        );
      }

      return response.data;
    } catch (error: any) {
      const errorMessage = error.response.data.email || 'Помилка реєстрації';
      return rejectWithValue(errorMessage);
    }
  },
);
