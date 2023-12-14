import { Link } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { closeModal, openModal } from '@/store/modalSlice';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { CreateNewStore } from './CreateNewStore';
import { Icon } from '@iconify/react';
import s from './Store.module.scss';

export const Store = () => {
  const dispatch = useAppDispatch();
  const isCreateStoreModalOpen = useAppSelector(
    (state) => state.modal.createNewStore,
  );
  const isSuccessfulMessageModalOpen = useAppSelector(
    (state) => state.modal.successfulCreateStore,
  );

  const handleOpenCreateStoreModal = () => {
    dispatch(openModal('createNewStore'));
  };

  const handleCloseSuccessfulMessageModal = () => {
    dispatch(closeModal('successfulCreateStore'));
  };

  return (
    <section className={s.store}>
      <h4 className={s.store_title}>Створіть свій магазин вже прямо зараз!</h4>
      <p className={s.store_text}>
        Ваша творчість - неповторний скарб! Створіть свій власний магазин на
        нашому маркетплейсі та вже зараз покажіть усім ваші неймовірні вироби
      </p>
      <ButtonUI
        label='Почати продавати'
        className={s.store_button}
        onClick={handleOpenCreateStoreModal}
      />

      {isCreateStoreModalOpen && (
        <Modal modalId='createNewStore' className={s.modal}>
          <CreateNewStore />
        </Modal>
      )}

      {isSuccessfulMessageModalOpen && (
        <Modal modalId='successfulCreateStore' className={s.modal}>
          <>
            <OrnamentalTitle tag='h4' text='Магазин успішно створено!' />
            <p className={s.modal_subtitle}>
              Тепер час почати його наповнювати. <br />
              Розкажіть більше про себе, додайте ваші унікальні товари, яскраві
              фото, опис
            </p>
            <div className={`${s.modal_hint} ${s.modal_hint_success}`}>
              <i>
                <Icon icon='solar:info-circle-outline' />
              </i>
              <p>Пам’ятайте, чим більше деталей, тим краще!</p>
            </div>
            <Link
              to='/account/store/settings'
              onClick={handleCloseSuccessfulMessageModal}
              className={s.modal_btn}
            >
              Гаразд
            </Link>
          </>
        </Modal>
      )}
    </section>
  );
};
