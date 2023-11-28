import { buttonsOrderData } from '@/constants/buttonsOrderData';
import s from './Order.module.scss';
import { useState } from 'react';

export const Order = () => {
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setActiveButtonId(buttonId);
  };

  return (
    <section className={s.order}>
      <h4 className={s.order_title}>Мої покупки</h4>
      <div className={s.order_buttons}>
        {buttonsOrderData.map((button) => (
          <button
            key={button.id}
            className={button.id === activeButtonId ? s.active : ''}
            onClick={() => handleButtonClick(button.id)}
          >
            {button.label}
          </button>
        ))}
      </div>
    </section>
  );
};
