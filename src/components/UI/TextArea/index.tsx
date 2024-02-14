import { useFormContext } from 'react-hook-form';
import { useCharCount } from '@/hooks/useCharCount';
import { TextAreaProps } from '@/types';
import { Icon } from '@iconify/react';
import s from './TextArea.module.scss';

export const TextArea = ({
  id,
  name,
  required = false,
  defaultValue,
  placeholder,
  cols,
  rows,
  maxLength,
  className,
  editModeIcon,
  shouldApplyErrorStyles = true,
  shouldApplySuccessStyles = true,
}: TextAreaProps) => {
  const {
    register,
    formState: { errors, dirtyFields },
  } = useFormContext();

  const textareaAttributes = {
    name,
    id,
    placeholder: placeholder,
    cols: cols || 40,
    rows: rows || 7,
    maxLength: maxLength || 1000,
  };

  const { charCount, handleInput } = useCharCount(
    defaultValue || '',
    maxLength as number,
  );

  const hasError = errors[id];
  const isDirty = id in dirtyFields;

  const textAreaClassName = `${s.textarea}
  ${shouldApplyErrorStyles && hasError && s.textarea_error}
  ${shouldApplySuccessStyles && !hasError && isDirty && s.textarea_success}`;

  return (
    <div className={`${s.wrap} ${className}`}>
      <textarea
        {...textareaAttributes}
        {...register(id as string, {
          required: required,
        })}
        defaultValue={defaultValue}
        onInput={(event) =>
          handleInput(event as React.ChangeEvent<HTMLTextAreaElement>)
        }
        className={textAreaClassName}
      />

      {editModeIcon && !isDirty && (
        <i className={`${s.icon} ${s.icon_edit}`}>
          <Icon icon='solar:pen-outline' />
        </i>
      )}

      {shouldApplyErrorStyles && hasError && (
        <i className={`${s.icon} ${s.icon_invalid}`}>
          <Icon icon='solar:danger-circle-outline' />
        </i>
      )}

      {shouldApplySuccessStyles && !hasError && isDirty && (
        <i className={`${s.icon} ${s.icon_valid}`}>
          <Icon icon='solar:unread-outline' />
        </i>
      )}

      {maxLength && (
        <p className={s.char_count}>
          {charCount}/{maxLength} символів
        </p>
      )}
    </div>
  );
};
