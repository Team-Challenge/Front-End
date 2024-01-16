import { useState } from 'react';
import { ButtonsBarProps } from '@/types';
import s from './ButtonsBar.module.scss';

export const ButtonsBar = ({ buttonsList, className }: ButtonsBarProps) => {
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setActiveButtonId(buttonId);
  };

  return (
    <div className={`${s.buttons} ${className}`}>
      {buttonsList.map(({ id, label }: { id: number; label: string }) => (
        <button
          key={id}
          className={`${s.button} ${id === activeButtonId ? s.active : ''}`}
          onClick={() => handleButtonClick(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
};
