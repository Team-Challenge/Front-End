import { BooleanState } from '@/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: BooleanState = {};

const overlayStateSlice = createSlice({
  name: 'overlayComponentState',
  initialState,
  reducers: {
    openComponent: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    closeComponent: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { openComponent, closeComponent } = overlayStateSlice.actions;

export default overlayStateSlice.reducer;
