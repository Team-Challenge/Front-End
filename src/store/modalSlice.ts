import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  [key: string]: boolean;
}

const initialState: ModalState = {};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = true;
    },
    closeModal: (state, action: PayloadAction<string>) => {
      state[action.payload] = false;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
