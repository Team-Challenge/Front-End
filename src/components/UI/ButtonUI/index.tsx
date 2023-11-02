import { ButtonUIProps } from '@/types';
import s from './ButtonUI.module.scss';

export const ButtonUI = ({
  label,
  variant = 'main',
  className,
  onClick,
  disabled = false,
}: ButtonUIProps) => {
  const btnStyle = `${s.btn} ${className}
  ${variant === 'main' ? s.main : s.secondary}`;

  return (
    <button
      type='submit'
      className={btnStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
