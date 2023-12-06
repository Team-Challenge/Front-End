import { PasswordRecoveryFormProps } from '@/types';
import { OrnamentalTitle } from '../OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import s from './Auth.module.scss';

export const PasswordRecoveryForm = ({
  isForgotPassword,
}: PasswordRecoveryFormProps) => {
  return (
    <div className={`auth-modal-message ${s.password_recovery}`}>
      <OrnamentalTitle tag='h4' text='Упс, забули свій пароль?' />
      <p>
        На жаль, наш маркетплейс поки не підтримує відновлення пароля, але ця
        функція вже у наших планах на найближче майбутнє.
        <span>Дякуємо за розуміння!</span>
      </p>
      <ButtonUI label='Повернутися' variant='main' onClick={isForgotPassword} />
    </div>
  );
};
