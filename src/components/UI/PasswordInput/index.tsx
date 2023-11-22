import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordInputProps } from '@/types';
import { OpenEyeIcon } from '@/components/icons/OpenEyeIcon';
import { CloseEyeIcon } from '@/components/icons/CloseEyeIcon';
import { InvalidIcon } from '@/components/icons/InvalidIcon';
import { ValidIcon } from '@/components/icons/ValidIcon';
import s from './PasswordInput.module.scss';

export const PasswordInput = ({
  id,
  placeholder,
  validate,
  required,
  isLogin,
  isLoginError,
  onClick,
  isRepeatPassword = false,
  className
}: PasswordInputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisibility = () => {
    setPasswordShown(!passwordShown);
  };

  const hasError = errors[id];
  const isDirty = id in dirtyFields;

  const inputClassName = `${s.input} ${className}
    ${hasError && !isLogin || isLoginError ? s.input_error : ''}
    ${!hasError && isDirty && !isLogin ? s.input_success : ''}`;

  return (
    <>
      <div className={s.wrap}>
        <input
          type={passwordShown ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(id, {
            validate: validate,
            pattern: {
              value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
              message:
                'Пароль повинен містити хоча б одну велику літеру, одну маленьку літеру та цифру',
            },
            required: required,
            minLength: {
              value: 8,
              message:
                'Будь ласка, введіть пароль, який містить принаймні 8 символів',
            },
          })}
          onClick={onClick}
          className={inputClassName}
        />
        <div className={s.icon}>
          <button onClick={togglePasswordVisibility} className={s.icon_eye}>
            {passwordShown ? <OpenEyeIcon /> : <CloseEyeIcon />}
          </button>
          {hasError && !isLogin || isLoginError ? (
            <i className={s.icon_invalid}>
              <InvalidIcon />
            </i>
          ) : (
            isDirty &&
            !isLogin && (
              <i className={s.icon_valid}>
                <ValidIcon />
              </i>
            )
          )}
        </div>
      </div>

      {hasError && !isLogin && (
        <p className={`error-text ${s.error}`}>
          {isRepeatPassword
            ? 'Введені паролі не співпадають. Будь ласка, перевірте і спробуйте ще раз'
            : (hasError.message as string)}
        </p>
      )}
    </>
  );
};
