/* eslint-disable no-param-reassign */
/* eslint-disable eqeqeq */
import axios from 'axios';
import { AuthResponse } from '@/types';

export const API_URL = import.meta.env.VITE_APP_API_URL
  ? import.meta.env.VITE_APP_API_URL
  : 'http://207.154.197.128:8080/';

const $api = axios.create({
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
  withCredentials: true,
  baseURL: API_URL,
});

$api.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
  return config;
});

$api.interceptors.request.use(
  (config) => {
    return config;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status == 401 &&
      error.config &&
      !error.config._isRetry
    ) {
      originalRequest._isRetry = true;
      try {
        const response = await $api.get<AuthResponse>('/accounts/refresh');
        localStorage.setItem('token', response.data.access_token);
        return await $api.request(originalRequest);
      } catch (e) {
        console.log('not auth');
      }
    }
    throw error;
  },
);

export default $api;
