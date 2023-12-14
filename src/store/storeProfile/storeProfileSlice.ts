import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StoreProfileState {
  name: string,
  description: string,
  shop_photo: string,
  banner_photo: string,
  phone_number: string,
  link: string
}

const initialState: StoreProfileState = {
  name: '',
  description: '',
  shop_photo: '',
  banner_photo: '',
  phone_number: '',
  link: ''
};

const storeProfileSlice = createSlice({
  name: 'store',
  initialState,
  reducers: {
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
  },
});

export const { setName, setDescription, setShopPhoto, setBannerPhoto, setStorePhoneNumber, setLink } =
storeProfileSlice.actions;

export default storeProfileSlice.reducer;