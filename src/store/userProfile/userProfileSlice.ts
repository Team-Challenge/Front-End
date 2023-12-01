import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserProfileState {
  full_name: string;
  phone_number: string;
}

const initialState: UserProfileState = {
  full_name: '',
  phone_number: '',
}

const userProfileSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.full_name = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    }
  },
});

export const { setFullName, setPhoneNumber } = userProfileSlice.actions;

export default userProfileSlice.reducer;
