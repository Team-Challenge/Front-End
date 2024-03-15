import { useState } from 'react';
import { ButtonsBarProps } from '@/types';
import s from './ButtonsBar.module.scss';

export const ButtonsBar = ({
  buttonsList,
  onStatusChange,
  className,
}: ButtonsBarProps) => {
  const [activeButtonLabel, setActiveButtonLabel] = useState<string>('Всі');

  const handleButtonClick = (label: string) => {
    setActiveButtonLabel(label);

    if (onStatusChange) {
      onStatusChange(label);
    }
  };

  return (
    <div className={`${s.buttons} ${className}`}>
      {buttonsList.map(({ id, label }) => (
        <button
          type='button'
          key={id}
          className={`${s.button} ${
            label === activeButtonLabel ? s.active : ''
          }`}
          onClick={() => handleButtonClick(label)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
