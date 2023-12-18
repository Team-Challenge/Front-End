import s from '../Settings.module.scss';
import { useAppSelector } from '@/hooks/reduxHook';
import { TextInput } from '@/components/UI/TextInput';
import { DeliveryInfo } from './DeliveryInfo';
import { DeliveryInfo as TDelivery } from '@/types';

export const UserDeliveryData = () => {
  const deliveryInfo: TDelivery | undefined = useAppSelector(
    (state) => state.userProfile.delivery_info,
  );

  return (
    <div className={s.form_wrap}>
      <p className={s.form_hints}>Дані про доставку</p>
      {deliveryInfo ? (
        <DeliveryInfo deliveryInfo={deliveryInfo}/>
      ) : (
        <>
          {/* todo Change inputs below into dropdown selects */}
          <TextInput id='post_service' type='text' placeholder='placeholder' />
          <TextInput id='city_name' type='text' placeholder='placeholder' />
          <TextInput id='branch_name' type='text' placeholder='placeholder' />
        </>
      )}
    </div>
  );
};
