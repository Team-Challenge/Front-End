import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DeliveryInfoState {
  novaPost: [];
  ukrPost: [];
}

const initialState: DeliveryInfoState = {
  novaPost: [],
  ukrPost: [],
};

const deliverySlice = createSlice({
  name: 'deliveryInfo',
  initialState,
  reducers: {
    setNovaPost: (state, action: PayloadAction<any>) => {
      state.novaPost = action.payload;
    },
    setUkrPost: (state, action: PayloadAction<any>) => {
      state.ukrPost = action.payload;
    },
  },
});

export const { setNovaPost, setUkrPost } =
deliverySlice.actions;

export default deliverySlice.reducer;