import $api from '@/http';

export const getAccountsInfo = async () => {
  try {
    const response = await $api.get('/accounts/info');
    if (response.status === 200) {
      return response.data;
    }
  } catch (error) {
    console.error('Error:', error);
    throw error;
  }
};
