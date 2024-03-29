import { createAsyncThunk } from '@reduxjs/toolkit';
import $api from '@/http';
import { setAuth } from '../auth/authSlice';
import {
  setDeliveryAddress,
  setDeliveryBranch,
  setDeliveryCity,
  setDeliveryPost,
  setFullName,
  setPhoneNumber,
  setProfilePhoto,
} from './userProfileSlice';

export const getUserInfo = createAsyncThunk(
  'userAccount/info',
  async (_, { dispatch }) => {
    try {
      const response = await $api.get('/accounts/info');
      if (response.status === 200) {
        dispatch(setFullName(response.data.full_name));
        dispatch(setPhoneNumber(response.data.phone_number));
        dispatch(setProfilePhoto(response.data.profile_photo));
        dispatch(setDeliveryCity(response.data.city));
        dispatch(setDeliveryPost(response.data.post));
        dispatch(setDeliveryBranch(response.data.branch_name));
        dispatch(setDeliveryAddress(response.data.address));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

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
  async (credentials: {
    currentPassword: string | undefined;
    newPassword: string | undefined;
  }) => {
    try {
      const response = await $api.post('/accounts/change_password', {
        current_password: credentials.currentPassword,
        new_password: credentials.newPassword,
      });
      if (response.status === 200) {
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

export const uploadProfilePhoto = createAsyncThunk(
  'userSettings/uploadProfilePhoto',
  async (formData: FormData) => {
    try {
      const response = await $api.post('/accounts/profile_photo', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const deleteProfilePhoto = createAsyncThunk(
  'userSettings/deleteProfilePhoto',
  async () => {
    try {
      const response = await $api.delete('/accounts/profile_photo');
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const changeUserDeliveryInfo = createAsyncThunk(
  'userSettings/changeUserDeliveryInfo',
  async (data: {
    city: string | undefined;
    post: string | undefined;
    address: string | undefined;
    branch_name: string | undefined;
  }) => {
    try {
      const response = await $api.post('/accounts/delivery_info', {
        city: data.city,
        post: data.post,
        address: data.address,
        branch_name: data.branch_name,
      });
      if (response.status === 200) {
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);
