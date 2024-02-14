import { useState, KeyboardEvent } from 'react';
import { useFormContext } from 'react-hook-form';
import { QuantityInputProps } from '@/types';
import s from './QuantityInput.module.scss';

export const QuantityInput = ({
  type,
  id,
  placeholder,
  required,
  value,
  unit,
  errorMessage,
  label,
  field,
  fieldState,
  onChange,
}: QuantityInputProps) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = errors[id];

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      event.preventDefault();
    }
  };

  return (
    <div className={s.quantity}>
      <label htmlFor={id} className={s.quantity_label}>
        {label}
      </label>
      <div className={`${s.quantity_wrap} ${isFocused && s.focused}`}>
        <input
          {...field}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          required={required}
          className={s.quantity_input}
          onChange={onChange ? onChange : field.onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
        />
        <div className={s.quantity_unit}>{unit}</div>
      </div>

      {fieldState?.error && !hasError && (
        <p className='error-text'>{errorMessage}</p>
      )}

      {hasError && <p className='error-text'>{errorMessage}</p>}
    </div>
  );
};
