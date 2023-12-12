import { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal, openModal } from '@/store/modalSlice';
import { LoginForm } from './AuthForm/LoginForm';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { PasswordRecoveryForm } from './PasswordRecoveryForm';
import { SuccessMessage } from './SuccessMessage';
import s from './Auth.module.scss';

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const [isPasswordRecovery, setIsPasswordRecovery] = useState<boolean>(false);
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);

  const isForgotPassword = () => {
    setIsPasswordRecovery(!isPasswordRecovery);
  };

  const isSuccessLogin = () => {
    setIsSuccessMessage(!isSuccessMessage);
  };

  const handleOpenRegistration = () => {
    dispatch(closeModal('login'));
    dispatch(openModal('registration'));
  };

  return (
    <>
      {!isPasswordRecovery && !isSuccessMessage && (
        <>
          <OrnamentalTitle tag='h4' text='Вхід' className={s.login_title} />
          <LoginForm
            isForgotPassword={isForgotPassword}
            isSuccessLogin={isSuccessLogin}
          />
          <div className={`account-promt ${s.login_promt}`}>
            <p>Ще немає облікового запису?</p>
            <button onClick={handleOpenRegistration}>Зареєструватися</button>
          </div>
        </>
      )}
      {isPasswordRecovery && (
        <PasswordRecoveryForm isForgotPassword={isForgotPassword} />
      )}
      {isSuccessMessage && <SuccessMessage id='login' />}
    </>
  );
};
