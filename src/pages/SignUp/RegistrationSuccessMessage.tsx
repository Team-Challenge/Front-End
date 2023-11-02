import { AuthButton } from '@/components/auth/AuthButton';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { useNavigate } from 'react-router-dom';
import s from './SignUp.module.scss';

export const RegistrationSuccessMessage = () => {
  const navigate = useNavigate();

  return (
    <div className={s.message}>
      <AuthHeader text='Вітаємо!' />
      <div className={s.message_buttons}>
        <AuthButton
          text='Повернутись на головну'
          variant='secondary'
          onClick={() => navigate(`/`)}
        />
        <AuthButton text='Увійти' onClick={() => navigate(`/signin`)} />
      </div>
    </div>
  );
};
