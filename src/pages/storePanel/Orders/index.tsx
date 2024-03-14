import { useState } from 'react';
import { purchaseStatusList, emptySectionText } from '@/constants';
import { ButtonsBar } from '@/components/ButtonsBar';
import { OrdersList } from '@/pages/storePanel/components/orders/OrdersList';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import s from './Orders.module.scss';

export const Orders = () => {
  const { width } = useWindowDimensions();
  const [isOrdersAvailable, setIsOrdersAvailable] = useState<boolean>(true);

  return isOrdersAvailable ? (
    <section className={s.orders}>
      {width >= 991.98 && <h4 className={s.orders_title}>Замовлення</h4>}
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
