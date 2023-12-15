import s from '../Settings.module.scss'
import { Icon } from '@iconify/react';
import { Modal } from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { DeliverySelect } from './DeliverySelect';

export const UserDeliveryData = () => {
  const isModalOpen = useAppSelector(state => state.modal.deliveryInfo)
  const dispatch = useAppDispatch()

  const hanldeOpenModal = () => {
    dispatch(openModal('deliveryInfo'))
  }

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>Дані про доставку</p>
      {true && (
        <>
          <p className={s.form_hints}>
            На жаль, у вас ще не додано жодної адреси доставки
          </p>
          <span className={s.addButton}>
            <Icon icon='solar:add-circle-outline'/>
            <button onClick={hanldeOpenModal}>Додати</button>
          </span>
        </>
      )}
      {isModalOpen && (
        <Modal modalId='deliveryInfo' className={s.modal} >
          <>delivery</>
          <DeliverySelect />
        </Modal>
      )}
    </div>
  );
};
