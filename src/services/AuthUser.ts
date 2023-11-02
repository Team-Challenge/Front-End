import { AxiosResponse } from 'axios';
import { IUserAuth } from '@/types';
import $api from '@/http';

const UserService = {
  fetchUsers: async (): Promise<AxiosResponse<IUserAuth[]>> => {
    return $api.get<IUserAuth[]>('/users');
  },
};

export default UserService;
