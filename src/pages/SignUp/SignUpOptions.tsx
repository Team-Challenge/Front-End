import { AuthButton } from '@/components/auth/AuthButton';
import { AuthHeader } from '@/components/auth/AuthHeader';
import { AuthLink } from '@/components/auth/AuthLinks';
import { SignUpOptionsProps } from '@/types';
import s from './SignUp.module.scss';

export const SignUpOptions = ({ handleSignUpEmail }: SignUpOptionsProps) => {
  return (
    <div className={s.signup}>
      <AuthHeader text='Реєстрація' />
      <div className={s.signup_form}>
        <AuthButton
          text='Зареєструватися за допомогою Google'
          variant='secondary'
          className={s.signup_btn}
        />
        <span className={s.signup_line}>або</span>
        <AuthButton
          text='Продовжити за допомогою Email'
          variant='main'
          className={s.signup_btn}
          onClick={handleSignUpEmail}
        />
      </div>
      <p className={s.signup_text}>
        Створюючи обліковий запис, ви погоджуєтеся з нашими Умовами надання
        послуг, Політикою конфіденційності та стандартними налаштуваннями
        сповіщень.
      </p>
      <AuthLink isRegistration />
    </div>
  );
};
