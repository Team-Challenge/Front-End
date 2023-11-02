import { SignUpEmailProps } from '@/types';
import { RegistrationForm } from '@/components/auth/AuthForm/RegistrationForm';
import { AuthHeader } from '@/components/auth/AuthHeader';
import s from './SignUp.module.scss';

export const SignUpWithEmail = ({ openModal }: SignUpEmailProps) => {
  return (
    <div className={s.email}>
      <div className={s.email_form}>
        <AuthHeader text='Реєстрація' />
        <RegistrationForm openModal={openModal} />
      </div>
    </div>
  );
};
