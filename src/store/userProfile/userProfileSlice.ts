import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfileState {
  full_name: string;
  phone_number: string;
  profile_picture: string;
  city?: string;
  post?: string;
  address?: string;
  branch_name?: string;
}

const initialState: UserProfileState = {
  full_name: '',
  phone_number: '',
  profile_picture: '',
  city: '',
  post: '',
  address: '',
  branch_name: '',
};

const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.full_name = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setProfilePhoto: (state, action: PayloadAction<string>) => {
      state.profile_picture = action.payload;
    },
    setDeliveryCity: (state, action: PayloadAction<string>) => {
      state.city = action.payload;
    },
    setDeliveryPost: (state, action: PayloadAction<string>) => {
      state.post = action.payload;
    },
    setDeliveryBranch: (state, action: PayloadAction<string>) => {
      state.branch_name = action.payload;
    },
    setDeliveryAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    }
  },
});

export const { setFullName, setPhoneNumber, setProfilePhoto, setDeliveryCity, setDeliveryPost, setDeliveryBranch, setDeliveryAddress } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
