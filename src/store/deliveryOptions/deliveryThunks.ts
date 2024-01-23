import $api from '@/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setNovaPost, setUkrPost } from './deliverySlice';

export const getNovaPostInfo = createAsyncThunk(
  'deliveryInfo/novaPost',
  async (_, { dispatch }) => {
    try {
      const response = await $api.get('/orders/nova_post');
      if (response.status === 200) {
        dispatch(setNovaPost(response.data));
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const getUkrPostInfo = createAsyncThunk(
  'deliveryInfo/ukrPost',
  async (_, { dispatch }) => {
    try {
      const response = await $api.get('/orders/ukr_post');
      if (response.status === 200) {
        dispatch(setUkrPost(response.data));
        return response.data;
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);
