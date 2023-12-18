import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { DeliveryInfo as TDelivery } from '@/types';
import { Icon } from '@iconify/react';
import settings from '../Settings.module.scss';
import styles from './DeliveryInfo.module.scss';

type TProps = {
  deliveryInfo: TDelivery | undefined;
}

export const DeliveryInfo = ({ deliveryInfo }: TProps) => {

  if (deliveryInfo)
    return (
      <div className={settings.form_wrap}>
        <div className={styles.delivery_card}>
          <p>{deliveryInfo.city_name}</p>
          <p>{deliveryInfo.branch_name}</p>
        </div>
        <div className={styles.delivery_buttons}>
          <span className={settings.smallButton}>
            <Icon icon='solar:trash-bin-minimalistic-outline' />
            <button>Видалити</button>
          </span>
        </div>
      </div>
    );
};
