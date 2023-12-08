import { useFormContext } from 'react-hook-form';
import { TextInputProps } from '@/types';
import { Icon } from '@iconify/react';
import s from './TextInput.module.scss';

export const TextInput = ({
  type = 'text',
  id,
  value,
  placeholder,
  required = false,
  isAuth,
  isAuthError,
  editModeIcon,
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

  const inputClassName = `${s.input}
    ${(hasError && !isAuth) || isAuthError ? s.input_error : ''}
    ${!hasError && isDirty && !isAuth ? s.input_success : ''}`;

  return (
    <div className={className}>
      <label className={s.label}>
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
          defaultValue={value}
        />

        {editModeIcon && !isDirty && !isAuthError && (
          <i className={`${s.icon} ${s.icon_profile}`}>
            <Icon icon='solar:pen-outline' />
          </i>
        )}

        {(hasError && !isAuth) || isAuthError ? (
          <i className={`${s.icon} ${s.icon_invalid}`}>
            <Icon icon='solar:danger-circle-outline' />
          </i>
        ) : (
          isDirty &&
          !isAuth && (
            <i className={`${s.icon} ${s.icon_valid}`}>
              <Icon icon='solar:unread-outline' />
            </i>
          )
        )}
      </label>

      {hasError && !isAuth && (
        <p className={`error-text ${s.error}`}>{hasError.message as string}</p>
      )}
    </div>
  );
};
