import { AxiosResponse } from 'axios';
import { AuthResponse } from '@/types';
import $api from '@/http/index';

const AuthService = {
  login: async (
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>('/accounts/signin', { email, password });
  },
  registration: async (
    full_name: string | undefined,
    email: string,
    password: string,
  ): Promise<AxiosResponse<AuthResponse>> => {
    return $api.post<AuthResponse>('/accounts/signup', {
      full_name,
      email,
      password,
    });
  },
  logout: async (): Promise<void> => {
    return $api.delete('/accounts/logout');
  },
};

export default AuthService;
