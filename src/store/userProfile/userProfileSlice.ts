import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfileState {
  full_name: string;
  phone_number: string;
  profile_picture: string;
}

const initialState: UserProfileState = {
  full_name: '',
  phone_number: '',
  profile_picture: '',
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
  },
});

export const { setFullName, setPhoneNumber, setProfilePhoto } =
  userProfileSlice.actions;

export default userProfileSlice.reducer;
