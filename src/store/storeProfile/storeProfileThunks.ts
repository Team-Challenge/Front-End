import $api from '@/http';
import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  setStore,
  setName,
  setDescription,
  setShopPhoto,
  setBannerPhoto,
  setStorePhoneNumber,
  setLink,
} from './storeProfileSlice';

export const getStoreInfo = createAsyncThunk(
  'storeSettings/info',
  async (_, { dispatch }) => {
    try {
      const response = await $api.get('/shops/shop_info');
      if (response.status === 200) {
        dispatch(setStore(true));
        dispatch(setName(response.data.name));
        dispatch(setDescription(response.data.description));
        dispatch(setShopPhoto(response.data.shop_photo));
        // todo change according to docs: banner_photo
        dispatch(setBannerPhoto(response.data.banner_shop));
        dispatch(setStorePhoneNumber(response.data.phone_number));
        dispatch(setLink(response.data.link));
      }
    } catch (e) {
      console.warn('Ой, здається, у вас ще немає створеного магазину.');
      // const error = e as Error;
      // throw error;
    }
  },
);

export const changeStoreInfo = createAsyncThunk(
  'storeSettings/changeInfo',
  async (credentials: {
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

export const changeBanner = createAsyncThunk(
  'storeSettings/changeBanner',
  async (formData: FormData) => {
    try {
      const response = await $api.post('/shops/shop_banner', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      return response.data
    } catch (error) {
      throw error;
    }
  },
);

export const deleteBanner = createAsyncThunk(
  'storeSettings/deleteBanner', 
  async () => {
    try {
      const response = await $api.delete('shops/shop_banner')
      return response.data
    } catch (error) {
      throw error
    }
  }
)