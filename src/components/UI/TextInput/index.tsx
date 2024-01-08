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
  isServerValidation,
  isServerError,
  editModeIcon,
  onClick,
  onInput,
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
    ${(hasError && !isServerValidation) || isServerError ? s.input_error : ''}
    ${!hasError && isDirty && !isServerValidation ? s.input_success : ''}`;

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
          onInput={onInput}
          defaultValue={value}
        />

        {editModeIcon && !isDirty && !isServerError && (
          <i className={`${s.icon} ${s.icon_edit}`}>
            <Icon icon='solar:pen-outline' />
          </i>
        )}

        {(hasError && !isServerValidation) || isServerError ? (
          <i className={`${s.icon} ${s.icon_invalid}`}>
            <Icon icon='solar:danger-circle-outline' />
          </i>
        ) : (
          isDirty &&
          !isServerValidation && (
            <i className={`${s.icon} ${s.icon_valid}`}>
              <Icon icon='solar:unread-outline' />
            </i>
          )
        )}
      </label>

      {hasError && !isServerValidation && (
        <p className={`error-text ${s.error}`}>{hasError.message as string}</p>
      )}
    </div>
  );
};
