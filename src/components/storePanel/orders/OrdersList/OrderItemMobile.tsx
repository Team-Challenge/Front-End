import { useState } from 'react';
import { getStatusColor } from '@/utils/getStatusColor';
import { OrderItemProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { Tooltip } from '@/components/UI/Tooltip';
import { OrderProductList } from '../OrderProductList';
import { ParcelNumberForm } from '../ParcelNumberForm';
import { OrderDeliveryInfo } from '../OrderDeliveryInfo';
import { Icon } from '@iconify/react';
import s from './OrdersList.module.scss';

export const OrderItemMobile = ({
  orderNumber,
  date,
  status,
  price,
  updateDate,
}: OrderItemProps) => {
  const statusColor = getStatusColor(status, s);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.addParcelNumber);

  const handleAddParcelNumberForm = () => {
    dispatch(openModal('addParcelNumber'));
  };

  return (
    <>
      <div className={s.item}>
        <div className={s.item_title}>
          <p>Замовлення {orderNumber}</p>
          <button onClick={() => setIsOpen(!isOpen)}>
            <Icon
              icon='solar:alt-arrow-down-outline'
              className={isOpen ? s.icon_open : s.icon_close}
            />
          </button>
        </div>
        <div className={s.item_wrap}>
          <p className={s.item_date}>
            Отримано
            <span>{date}</span>
          </p>
          <p className={s.item_status}>
            Статус
            <span className={statusColor}>{status}</span>
          </p>
          {!isOpen && (
            <p className={s.item_price}>
              Разом
              <span>{price} &#x20b4;</span>
            </p>
          )}
          <p>
            Оновлено
            <span>{updateDate}</span>
          </p>
          <div className={s.item_parcel}>
            <div className={s.item_parcel_number}>
              <p>Номер посилки</p>
              <Tooltip
                text='Введіть тут отриманий на пошті номер відправлення і ми повідомимо покупця, що товар вже прямує до нього'
                className={s.item_tooltip}
              >
                <Icon icon='solar:info-circle-outline' />
              </Tooltip>
            </div>
            <button
              onClick={handleAddParcelNumberForm}
              className={s.item_parcel_button}
            >
              Номер ТТН
            </button>
          </div>
        </div>

        {isOpen && (
          <>
            <OrderProductList />
            <OrderDeliveryInfo />
            <button className={s.order_cancel}>
              <Icon icon='solar:close-circle-outline' />
              Скасувати замовлення
            </button>
          </>
        )}
      </div>

      {isModalOpen && <ParcelNumberForm />}
    </>
  );
};
