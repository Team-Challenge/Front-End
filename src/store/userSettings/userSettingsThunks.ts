import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '@/http';
import { setAuth } from '../auth/authSlice';
import { setFullName, setPassword, setPhoneNumber } from './userSettingsSlice';

export const changeFullName = createAsyncThunk(
  'userSettings/changeFullName',
  async (newFullName: string, { dispatch }) => {
    try {
      const response = await $api.post('/accounts/change_full_name', {
        full_name: newFullName,
      });
      if (response.status === 200) {
        dispatch(setFullName);
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const changePhoneNumber = createAsyncThunk(
  'userSettings/changePhoneNumber',
  async (addNumber: string | undefined, { dispatch }) => {
    try {
      const response = await $api.post('/accounts/change_phone_number', {
        phone_number: addNumber,
      });
      if (response.status === 200) {
        dispatch(setPhoneNumber);
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const changePassword = createAsyncThunk(
  'userSettings/changePassword',
  async (
    credentials: {
      currentPassword: string | undefined;
      newPassword: string | undefined;
    },
    { dispatch },
  ) => {
    try {
      const response = await $api.post('/accounts/change_password', {
        current_password: credentials.currentPassword,
        new_password: credentials.newPassword,
      });
      if (response.status === 200) {
        dispatch(setPassword);
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const userLogout = createAsyncThunk(
  'userSettings/logout',
  async (_, { dispatch }) => {
    try {
      const response = await $api.delete('/accounts/logout');
      if (response.status === 200) {
        localStorage.removeItem('token');
        dispatch(setAuth(false));
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

import axios from 'axios';

export const uploadProfilePhoto = createAsyncThunk(
  'userSettings/uploadProfilePhoto',
  async (formData: FormData, { dispatch }) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No token found');
      }

      const response = await axios.post(
        'http://207.154.197.128:8080/accounts/profile_photo',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        },
      );

      if (response.status === 200) {
        return response.data;
      } else {
        throw new Error('Failed to upload profile photo');
      }
    } catch (error) {
      console.error('Error in uploadProfilePhoto:', error);
      throw error;
    }
  },
);
