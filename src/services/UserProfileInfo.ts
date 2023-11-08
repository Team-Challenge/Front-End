import { API_URL } from '@/http';
import axios from 'axios';

export const getAccountsInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      `${API_URL}/accounts/info`,
      {
        headers,
      },
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
