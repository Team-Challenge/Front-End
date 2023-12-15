import $api from '@/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setStore, setName, setDescription, setShopPhoto, setBannerPhoto, setStorePhoneNumber, setLink } from './storeProfileSlice';

export const getStoreInfo = createAsyncThunk(
  'shops/info',
  async (_, { dispatch }) => {
    try {
      const response = await $api.get('/shops/shop_info');
      if (response.status === 200) {
        dispatch(setStore(true));
        dispatch(setName(response.data.name));
        dispatch(setDescription(response.data.description));
        dispatch(setShopPhoto(response.data.shop_photo));
        dispatch(setBannerPhoto(response.data.banner_photo));
        dispatch(setStorePhoneNumber(response.data.phone_number));
        dispatch(setLink(response.data.link));
      }
    } catch (e) {
      const error = e as Error;
      throw error;
    }
  },
);

export const changeStoreInfo = createAsyncThunk(
  'shops/changeInfo',
  async (
    credentials: {
      name?: string | undefined;
      description?: string | undefined;
      phone_number?: string | undefined;
      link?: string | undefined;
    }) => {
    try {
      const response = await $api.post('/shops/shop', {
        name: credentials.name,
        description: credentials.description,
        phone_number: credentials.phone_number,
        link: credentials.link,
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