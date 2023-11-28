import { useState } from 'react';
import { UserAuthProps } from '@/types';
import { RegistrationForm } from './AuthForm/RegistrationForm';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { SuccessMessage } from './SuccessMessage';

export const SignUp = ({ toggleForm }: UserAuthProps) => {
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);

  const isSuccessRegistration = () => {
    setIsSuccessMessage(!isSuccessMessage);
  };

  return (
    <>
      {!isSuccessMessage ? (
        <>
          <OrnamentalTitle tag='h4' text='Реєстрація' />
          <RegistrationForm isSuccessRegistration={isSuccessRegistration} />
          <div className='account-promt'>
            <p>Вже маєте обліковий запис?</p>
            <button onClick={toggleForm}>Увійдіть</button>
          </div>
        </>
      ) : (
        <SuccessMessage />
      )}
    </>
  );
};
