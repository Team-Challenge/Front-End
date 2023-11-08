import { useFormContext } from 'react-hook-form';
import { PasswordInput } from '@/components/UI/PasswordInput';
import s from './Settings.module.scss';

export const UserPassword = () => {
  const methods = useFormContext();

  const {
    getValues,
    watch,
    formState: { errors },
  } = methods;

  const oldPassword = watch('current_password');
  const newPassword = watch('new_password');
  const newPasswordRepeat = watch('new_password_repeat');

  const isAnyPasswordFilled = Boolean(newPassword || newPasswordRepeat || oldPassword);

  return (
    <label className={s.form_label}>
      Зміна паролю
      <PasswordInput
        id='current_password'
        placeholder='Старий пароль'
        required={isAnyPasswordFilled}
      />
      <PasswordInput id='new_password' placeholder='Новий пароль' required={isAnyPasswordFilled} />
      {errors.new_password && (
        <p className={`${s.form_error}`}>{errors.new_password.message as string}</p>
      )}
      <PasswordInput
        id='new_password_repeat'
        placeholder='Повторіть пароль'
        required={isAnyPasswordFilled}
        validate={(value: string) =>
          value === getValues('new_password') || 'Passwords do not match'
        }
      />
      {errors.new_password_repeat && <p className={`${s.form_error}`}>Passwords do not match</p>}
    </label>
  );
};
