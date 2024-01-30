import { ToggleSwitchProps } from '@/types';
import s from './ToggleSwitch.module.scss';

export const ToggleSwitch = ({
  id,
  name,
  className,
  field,
  value,
  onChange,
}: ToggleSwitchProps) => {
  return (
    <div className={`${s.toggle} ${className}`}>
      <label htmlFor={id} className={s.toggle_label}>
        <input
          {...field}
          type='checkbox'
          name={name}
          id={id}
          value={value}
          className={s.toggle_input}
          onChange={onChange}
        />
        <div className={s.toggle_slider} />
      </label>
    </div>
  );
};
