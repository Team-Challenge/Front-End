import { useState } from 'react';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal, openModal } from '@/store/modalSlice';
import { RegistrationForm } from './AuthForm/RegistrationForm';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { SuccessMessage } from './SuccessMessage';
import s from './Auth.module.scss';

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const [isSuccessMessage, setIsSuccessMessage] = useState<boolean>(false);

  const isSuccessRegistration = () => {
    setIsSuccessMessage(!isSuccessMessage);
  };

  const handleOpenLogin = () => {
    dispatch(closeModal('isRegistration'));
    dispatch(openModal('isLogin'));
  };

  return (
    <>
      {!isSuccessMessage ? (
        <>
          <OrnamentalTitle
            tag='h4'
            text='Реєстрація'
            className={s.registration_title}
          />
          <RegistrationForm isSuccessRegistration={isSuccessRegistration} />
          <div className='account-promt'>
            <p>Вже маєте обліковий запис?</p>
            <button onClick={handleOpenLogin}>Увійдіть</button>
          </div>
        </>
      ) : (
        <SuccessMessage id='isRegistration' />
      )}
    </>
  );
};
