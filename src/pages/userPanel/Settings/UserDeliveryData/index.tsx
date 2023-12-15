import s from '../Settings.module.scss';
import { Icon } from '@iconify/react';
import { Modal } from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { DeliverySelect } from './DeliverySelect';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { FormProvider, useForm } from 'react-hook-form';
import { DeliveryFormData } from '@/types';
import { UserPhoneNumber } from '../UserPhoneNumber';
import { FullName } from '@/components/FullName';
import { PhoneNumber } from '@/components/PhoneNumber';

export const UserDeliveryData = () => {
  const isModalOpen = useAppSelector((state) => state.modal.deliveryInfo);
  const dispatch = useAppDispatch();
  const userPhoneNumber = useAppSelector(
    (state) => state.userProfile.phone_number,
  );
  const fullName = useAppSelector((state) => state.userProfile.full_name);

  const methods = useForm<DeliveryFormData>({
    mode: 'onChange',
  });
  const { watch, reset } = methods;

  const hanldeOpenModal = () => {
    dispatch(openModal('deliveryInfo'));
  };

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>Дані про доставку</p>
      {true && (
        <>
          <p className={s.form_hints}>
            На жаль, у вас ще не додано жодної адреси доставки
          </p>
          <span className={s.addButton}>
            <Icon icon='solar:add-circle-outline' />
            <button onClick={hanldeOpenModal}>Додати</button>
          </span>
        </>
      )}
      {isModalOpen && (
        <Modal modalId='deliveryInfo' className={s.modal}>
          <OrnamentalTitle tag='h4' text='Введіть адресу' />
          <FormProvider {...methods}>
            <form id='delivery' onSubmit={(e) => e.preventDefault()}>
              <div className={s.form_wrap}>
                <p className={s.form_hints}>Ім’я та Прізвище од ержувача</p>
                <FullName value={fullName as string} />
                <p className={s.form_hints}>
                  {userPhoneNumber
                    ? 'Змінити номер телефону'
                    : 'Додати номер телефону'}
                </p>
                <PhoneNumber userPhoneNumber={userPhoneNumber} />
                <DeliverySelect />
              </div>
            </form>
          </FormProvider>
        </Modal>
      )}
    </div>
  );
};
