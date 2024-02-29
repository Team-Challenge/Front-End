import { useState } from 'react';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import { purchaseStatusList } from '@/constants/purchaseStatusList';
import s from './Purchases.module.scss';

export const Purchases = () => {
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setActiveButtonId(buttonId);
  };

  return (
    <section className={s.order}>
      <EmptyContentPage
        title='Ой, тут поки пусто'
        text='Схоже, ви ще нічого не купили на нашому маркетплейсі. Коли вам щось приглянеться, історія та статуси ваших покупок з’являться тут'
        item={<Icon icon='solar:bag-smile-outline' />}
      />
      {/* <h4 className={s.order_title}>Мої покупки</h4>
      <div className={s.order_buttons}>
        {purchaseStatusList.map((status) => (
          <button
            key={status.id}
            className={status.id === activeButtonId ? s.active : ''}
            onClick={() => handleButtonClick(status.id)}
          >
            {status.label}
          </button>
        ))}
      </div> */}
    </section>
  );
};
