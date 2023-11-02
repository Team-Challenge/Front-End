import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  full_name: string;
  phone_number: string;
  new_password: string;
}

const initialState = {
  full_name: '',
  phone_number: '',
  new_password: '',
} as UserState;

const userSettingsSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFullName: (state, action: PayloadAction<string>) => {
      state.full_name = action.payload;
    },
    setPhoneNumber: (state, action: PayloadAction<string>) => {
      state.phone_number = action.payload;
    },
    setPassword: (state, action: PayloadAction<string>) => {
      state.new_password = action.payload;
    },
  },
});

export const { setFullName, setPhoneNumber, setPassword } = userSettingsSlice.actions;

export default userSettingsSlice.reducer;
