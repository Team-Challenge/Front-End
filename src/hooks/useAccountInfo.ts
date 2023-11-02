import { useEffect, useState } from 'react';
import { getAccountsInfo } from '@/services/UserProfileInfo';
import { UserInfo } from '@/types';

export const useAccountInfo = () => {
  const [accountInfo, setAccountInfo] = useState<UserInfo | null>(null);

  useEffect(() => {
    getAccountsInfo()
      .then((data) => {
        setAccountInfo(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        return null;
      });
  }, []);

  return accountInfo;
};
