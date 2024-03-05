import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PASSWORD_REGEX } from '@/constants/RegExp';
import { PasswordInputProps } from '@/types';
import { Icon } from '@iconify/react';
import s from './PasswordInput.module.scss';

export const PasswordInput = ({
  id,
  placeholder,
  validate,
  required,
  isServerValidation,
  isServerError,
  onClick,
  isRepeatPassword = false,
  className,
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

  const inputClassName = `${s.input}
    ${(hasError && !isServerValidation) || isServerError ? s.input_error : ''}
    ${!hasError && isDirty && !isServerValidation ? s.input_success : ''}`;

  return (
    <div className={className}>
      <label className={s.label}>
        <input
          type={passwordShown ? 'text' : 'password'}
          placeholder={placeholder}
          {...register(id, {
            validate: validate,
            pattern: {
              value: PASSWORD_REGEX,
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
          <button
            type='button'
            onClick={togglePasswordVisibility}
            className={s.icon_eye}
            tabIndex={-1}
          >
            {passwordShown ? (
              <Icon icon='solar:eye-outline' />
            ) : (
              <Icon icon='solar:eye-closed-outline' />
            )}
          </button>
          {(hasError && !isServerValidation) || isServerError ? (
            <i className={s.icon_invalid}>
              <Icon icon='solar:danger-circle-outline' />
            </i>
          ) : (
            isDirty &&
            !isServerValidation && (
              <i className={s.icon_valid}>
                <Icon icon='solar:unread-outline' />
              </i>
            )
          )}
        </div>
      </label>

      {hasError && !isServerValidation && (
        <p className={`error-text ${s.error}`}>
          {isRepeatPassword
            ? 'Введені паролі не співпадають. Будь ласка, перевірте і спробуйте ще раз'
            : (hasError.message as string)}
        </p>
      )}
    </div>
  );
};
