import { Icon } from '@iconify/react';
import s from './OrderDeliveryInfo.module.scss';

export const OrderDeliveryInfo = () => {
  return (
    <div className={s.delivery}>
      <div className={s.delivery_user}>
        <Icon icon='solar:user-circle-outline' />
        <div className={s.delivery_block}>
          <p>Інформація про доставку</p>
          <p>Ірина Фаріон</p>
          <p>+380639379992</p>
          <p>Львів</p>
          <p>Нова пошта відділення №1</p>
        </div>
      </div>
      <div className={s.delivery_payment}>
        <Icon icon='solar:wallet-outline' />
        <div className={s.delivery_block}>
          <p>Спосіб оплати</p>
          <p>Накладений платіж</p>
        </div>
      </div>
    </div>
  );
};
