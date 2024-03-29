import axios from 'axios';
import { AppDispatch, AuthResponse } from '@/types';
import { API_URL } from '@/http';
import { setAuth } from './authSlice';

interface ErrorMessage {
  message: string;
}

export const checkAuth = () => {
  return async (dispatch: AppDispatch) => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem('refresh')}`,
      };
      const response = await axios.post<AuthResponse>(
        `${API_URL}/accounts/refresh`,
        null,
        {
          headers,
        },
      );
      if (response.status === 200) {
        localStorage.setItem('token', response.data.access_token);
        localStorage.setItem('refresh', response.data.refresh_token);
        dispatch(setAuth(true));
      }
    } catch (e) {
      const error = e as ErrorMessage;
      throw error;
    }
  };
};
