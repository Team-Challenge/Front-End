import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import { OrderItemMobile } from './OrderItemMobile';
import { OrderItemDesktop } from './OrderItemDesktop';
import s from './OrdersList.module.scss';

const products = [
  {
    orderNumber: '5555',
    date: '04.04.2024',
    status: 'В роботі',
    price: '566',
    updateDate: '05.04.2024',
  },
  {
    orderNumber: '65215',
    date: '04.04.2024',
    status: 'В дорозі',
    price: '566',
    updateDate: '05.04.2024',
  },
  {
    orderNumber: '4654565',
    date: '04.04.2024',
    status: 'Виконано',
    price: '566',
    updateDate: '05.04.2024',
  },
];

export const OrdersList = () => {
  const { width } = useWindowDimensions();

  return width >= 1260 ? (
    <div className={s.product_table}>
      <div className={`${s.headline} ${s.row}`}>
        <p>№ замовлення</p>
        <p>Отримано</p>
        <p>Разом</p>
        <p>Статус</p>
        <p>Оновлено</p>
        <div className={s.headline_number}>
          <p>Номер посилки</p>
          <Tooltip
            text='Введіть тут отриманий на пошті номер відправлення і ми повідомимо покупця, що товар вже прямує до нього'
            className={s.headline_tooltip}
          >
            <Icon icon='solar:info-circle-outline' />
          </Tooltip>
        </div>
      </div>
      {products.map((product) => (
        <OrderItemDesktop {...product} key={product.orderNumber} />
      ))}
    </div>
  ) : (
    <div className={s.product_list}>
      {products.map((product) => (
        <OrderItemMobile {...product} key={product.orderNumber} />
      ))}
    </div>
  );
};
