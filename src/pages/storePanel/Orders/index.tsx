import { useState } from 'react';
import { purchaseStatusList } from '@/constants/purchaseStatusList';
import { OrdersList } from '@/components/storePanel/orders/OrdersList';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import s from './Orders.module.scss';

export const Orders = () => {
  const [isOrdersAvailable, setIsOrdersAvailable] = useState<boolean>(true);
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setActiveButtonId(buttonId);
  };

  return (
    <>
      {isOrdersAvailable ? (
        <section className={s.orders}>
          <h4 className={s.orders_title}>Замовлення</h4>
          <div className={s.orders_status}>
            {purchaseStatusList.map(({ id, label }) => (
              <button
                key={id}
                className={`${s.orders_status_button} ${
                  id === activeButtonId ? s.active : ''
                }`}
                onClick={() => handleButtonClick(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <OrdersList />
        </section>
      ) : (
        <EmptyContentPage
          title='Ой, тут поки пусто'
          text='Здається, ще ніхто не встиг придбати ваші товари. Коли це станеться, історія та статуси ваших продажів з’являться тут.'
          item={<Icon icon='solar:tag-outline' />}
        />
      )}
    </>
  );
};
