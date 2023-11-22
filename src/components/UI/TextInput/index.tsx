import { useFormContext } from 'react-hook-form';
import { TextInputProps } from '@/types';
import { ValidIcon } from '@/components/icons/ValidIcon';
import s from './TextInput.module.scss';
import { Icon } from '@iconify/react';

export const TextInput = ({
  type = 'text',
  id,
  placeholder,
  required = false,
  isLogin,
  isLoginError,
  onClick,
  regex,
  errorMessage,
  minLength,
  minLengthMessage,
  maxLength,
  maxLengthMessage,
  className,
}: TextInputProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const hasError = errors[id];
  const isDirty = id in dirtyFields;

  const inputClassName = `${s.input} ${className}
    ${(hasError && !isLogin) || isLoginError ? s.input_error : ''}
    ${!hasError && isDirty && !isLogin ? s.input_success : ''}`;

  return (
    <>
      <div className={s.wrap}>
        <input
          type={type}
          placeholder={placeholder}
          {...register(id, {
            required: required,
            pattern: {
              value: regex as RegExp,
              message: errorMessage as string,
            },
            maxLength: {
              value: maxLength as number,
              message: maxLengthMessage as string,
            },
            minLength: {
              value: minLength as number,
              message: minLengthMessage as string,
            },
          })}
          className={inputClassName}
          onClick={onClick}
        />

        {(hasError && !isLogin) || isLoginError ? (
          <i className={`${s.icon} ${s.icon_invalid}`}>
            <Icon icon='solar:danger-circle-outline' />
          </i>
        ) : (
          isDirty &&
          !isLogin && (
            <i className={`${s.icon} ${s.icon_valid}`}>
              <Icon icon='solar:unread-outline' />
            </i>
          )
        )}
      </div>

      {hasError && !isLogin && (
        <p className={`error-text ${s.error}`}>{hasError.message as string}</p>
      )}
    </>
  );
};
