import { useFormContext } from 'react-hook-form';
import { useCharCount } from '@/hooks/useCharCount';
import { TextAreaProps } from '@/types';
import { Icon } from '@iconify/react';
import s from './TextArea.module.scss';

export const TextArea = ({
  name,
  id,
  placeholder,
  cols,
  rows,
  maxLength,
  className,
  defaultValue,
  editModeIcon,
}: TextAreaProps) => {
  const { register } = useFormContext();

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

  return (
    <div className={`${s.wrap} ${className}`}>
      <textarea
        {...textareaAttributes}
        {...register(name as string, {})}
        defaultValue={defaultValue}
        onInput={(event) =>
          handleInput(event as React.ChangeEvent<HTMLTextAreaElement>)
        }
        className={s.textarea}
      />

      {editModeIcon && (
        <i className={`${s.icon}`}>
          <Icon icon='solar:pen-outline' />
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
