import axios from 'axios';

export const getAccountsInfo = async () => {
  try {
    const token = localStorage.getItem('token');
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.get(
      'http://207.154.197.128:8080/accounts/info',
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
