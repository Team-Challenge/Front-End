/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { PasswordInputProps } from '@/types';
import { EyeIcon } from '@/components/icons/EyeIcon';
import s from './PasswordInput.module.scss';

export const PasswordInput = ({
  id,
  placeholder,
  validate,
  required,
}: PasswordInputProps) => {
  const { register } = useFormContext();

  const [passwordShown, setPasswordShown] = useState(false);
  const togglePasswordVisiblity = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={s.wrap}>
      <input
        type={passwordShown ? 'text' : 'password'}
        placeholder={placeholder}
        {...register(id, {
          validate: validate,
          pattern: {
            value: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
            message:
              'Your password must contain at least one uppercase letter, one lowercase letter, and a number',
          },
          required: required,
          minLength: {
            value: 8,
            message: 'Minimum of 8 characters',
          },
        })}
        className={s.input}
      />
      <i onClick={togglePasswordVisiblity} className={s.icon}>
        <EyeIcon />
      </i>
    </div>
  );
};
