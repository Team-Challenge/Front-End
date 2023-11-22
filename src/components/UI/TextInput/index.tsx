import { useFormContext } from 'react-hook-form';
import { TextInputProps } from '@/types';
import { InvalidIcon } from '@/components/icons/InvalidIcon';
import { ValidIcon } from '@/components/icons/ValidIcon';
import s from './TextInput.module.scss';

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
            <InvalidIcon />
          </i>
        ) : (
          isDirty &&
          !isLogin && (
            <i className={`${s.icon} ${s.icon_valid}`}>
              <ValidIcon />
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
