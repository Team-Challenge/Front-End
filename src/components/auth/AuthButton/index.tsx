import { AuthButtonProps } from '@/types';
import s from './AuthButton.module.scss';

export const AuthButton = ({
  text,
  onClick,
  className,
  variant = 'main',
  disabled,
}: AuthButtonProps) => {
  const btnStyle = `${s.btn} ${className}
    ${variant === 'main' ? s.main : s.secondary}`;

  return (
    <button
      type='submit'
      className={btnStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {text}
    </button>
  );
};
