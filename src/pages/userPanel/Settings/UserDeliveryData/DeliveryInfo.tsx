import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { DeliveryInfo as TDelivery } from '@/types';
import { Icon } from '@iconify/react';
import settings from '../Settings.module.scss'
import styles from './DeliveryInfo.module.scss'

export const DeliveryInfo = () => {
  const dispatch = useAppDispatch();

  const deliveryInfo: TDelivery | undefined = useAppSelector(
    (state) => state.userProfile.delivery_info,
  );

  const hanldeOpenModal = () => {
    dispatch(openModal('deliveryInfo'));
  };

  if (!deliveryInfo)
    return (
      <>
        <p className={settings.form_hints}>
          На жаль, у вас ще не додано жодної адреси доставки
        </p>
        <span className={settings.addButton}>
          <Icon icon='solar:add-circle-outline' />
          <button onClick={hanldeOpenModal}>Додати</button>
        </span>
      </>
    );

  if (deliveryInfo) return (
    <div className={styles.delivery}>
      <p>{deliveryInfo.full_name}</p>
      <p>{deliveryInfo.phone_number}</p>
      <p>{deliveryInfo.city_name}</p>
      <p>{deliveryInfo.branch_name}</p>
    </div>
  )
};
