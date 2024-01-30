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
  onChange,
}: QuantityInputProps) => {
  const {
    formState: { errors },
  } = useFormContext();

  const hasError = errors[id];

  return (
    <div className={s.quantity}>
      <label htmlFor={id} className={s.quantity_label}>
        {label}
      </label>
      <div className={s.quantity_wrap}>
        <input
          {...field}
          type={type}
          id={id}
          placeholder={placeholder}
          value={value}
          required={required}
          className={s.quantity_input}
          onChange={onChange ? onChange : field.onChange}
        />
        <div className={s.quantity_unit}>{unit}</div>
      </div>
      {hasError && <p className='error-text'>{errorMessage}</p>}
    </div>
  );
};
