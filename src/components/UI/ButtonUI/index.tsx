import { Link } from 'react-router-dom';
import { ButtonUIProps } from '@/types';
import s from './ButtonUI.module.scss';

export const ButtonUI = ({
  label,
  variant = 'main',
  className,
  onClick,
  type = 'submit',
  disabled = false,
  isLink = false,
  path = '/',
}: ButtonUIProps) => {
  const btnStyle = `${s.btn} ${className}
  ${variant === 'main' ? s.main : s.secondary}`;

  return isLink ? (
    <Link to={path} className={btnStyle} onClick={onClick}>
      {label}
    </Link>
  ) : (
    <button
      type={type}
      className={btnStyle}
      onClick={onClick}
      disabled={disabled}
    >
      {label}
    </button>
  );
};
