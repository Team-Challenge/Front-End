import { useState } from 'react';
import { purchaseStatusList, emptySectionText } from '@/constants';
import { ButtonsBar } from '@/components/ButtonsBar';
import { OrdersList } from '@/components/storePanel/orders/OrdersList';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import s from './Orders.module.scss';

export const Orders = () => {
  const [isOrdersAvailable, setIsOrdersAvailable] = useState<boolean>(true);

  return isOrdersAvailable ? (
    <section className={s.orders}>
      <h4 className={s.orders_title}>Замовлення</h4>
      <ButtonsBar buttonsList={purchaseStatusList} />
      <OrdersList />
    </section>
  ) : (
    <EmptyContentPage
      title='Ой, тут поки пусто'
      text={emptySectionText.ordersStorePanel}
      item={<Icon icon='solar:tag-outline' />}
    />
  );
};
