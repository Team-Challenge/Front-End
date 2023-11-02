import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUserAuth } from '@/types';

interface AuthState {
  user: IUserAuth;
  isAuth: boolean;
  isLoading: boolean;
}

const initialState: AuthState = {
  user: {} as IUserAuth,
  isAuth: false,
  isLoading: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuth: (state, action: PayloadAction<boolean>) => {
      state.isAuth = action.payload;
    },
    setUser: (state, action: PayloadAction<IUserAuth>) => {
      state.user = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setAuth, setUser, setLoading } = authSlice.actions;

export default authSlice.reducer;
