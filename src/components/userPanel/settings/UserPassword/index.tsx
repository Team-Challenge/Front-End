import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '@/components/UI/PasswordInput';
import s from './UserPassword.module.scss';

export const UserPassword = () => {
  const { getValues, watch } = useFormContext();

  const oldPassword = watch('current_password');
  const newPassword = watch('new_password');
  const newPasswordRepeat = watch('new_password_repeat');

  const isAnyPasswordFilled = Boolean(
    newPassword || newPasswordRepeat || oldPassword,
  );

  return (
    <div className={s.block}>
      <PasswordInput
        id='current_password'
        placeholder='Старий пароль'
        required={isAnyPasswordFilled}
      />
      <PasswordInput
        id='new_password'
        placeholder='Новий пароль'
        required={isAnyPasswordFilled}
      />
      <PasswordInput
        id='new_password_repeat'
        placeholder='Повторіть пароль'
        required={isAnyPasswordFilled}
        validate={(value: string) =>
          value === getValues('new_password') || 'Введені паролі не співпадають'
        }
        isRepeatPassword
      />
    </div>
  );
};
