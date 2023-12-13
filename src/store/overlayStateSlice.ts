import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface OverlayStateProps {
  [key: string]: boolean;
}

const initialState: OverlayStateProps = {};

const overlayStateSlice  = createSlice({
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
