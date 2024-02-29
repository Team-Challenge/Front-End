import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreProfileState {
  hasStore: boolean;
  name: string;
  description: string;
  shop_photo: string;
  banner_photo: string;
  phone_number: string;
  link: string;
  linkToStore: number;
}

const initialState: StoreProfileState = {
  hasStore: false,
  name: '',
  description: '',
  shop_photo: '',
  banner_photo: '',
  phone_number: '',
  link: '',
  linkToStore: 0,
};

const storeProfileSlice = createSlice({
  name: 'storeSettings',
  initialState,
  reducers: {
    setStore: (state, action: PayloadAction<boolean>) => {
      state.hasStore = action.payload;
    },
    setName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    setDescription: (state, action: PayloadAction<string>) => {
      state.description = action.payload;
    },
    setShopPhoto: (state, action: PayloadAction<string>) => {
      state.shop_photo = action.payload;
    },
    setBannerPhoto: (state, action: PayloadAction<string>) => {
      state.banner_photo = action.payload;
    },
    setStorePhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setLink: (state, action: PayloadAction<string>) => {
      state.link = action.payload;
    },
    setLinkToStore: (state, action: PayloadAction<number>) => {
      state.linkToStore = action.payload;
    },
  },
});

export const {
  setStore,
  setName,
  setDescription,
  setShopPhoto,
  setBannerPhoto,
  setStorePhoneNumber,
  setLink,
  setLinkToStore,
} = storeProfileSlice.actions;

export default storeProfileSlice.reducer;
