import { useState } from 'react';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { NewStoreFormData } from '@/types';
import { Modal } from '@/components/Modal';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { CreateNewStore } from './CreateNewStore';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './Store.module.scss';

export const Store = () => {
  const [isSuccessfulCreateStore, setIsSuccessfulCreateStore] =
    useState<boolean>(false);
  const isModalOpen = useAppSelector((state) => state.modal.createNewStore);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal('createNewStore'));
  };

  const onSubmit = (data: NewStoreFormData) => {
    console.log(`Create new store: ${data.name}`);
    setIsSuccessfulCreateStore(true);
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
        onClick={handleOpenModal}
      />

      {isModalOpen && (
        <Modal modalId='createNewStore' className={s.modal}>
          {!isSuccessfulCreateStore && <CreateNewStore onSubmit={onSubmit} />}

          {isSuccessfulCreateStore && (
            <>
              <OrnamentalTitle tag='h4' text='Магазин успішно створено!' />
              <p className={s.modal_subtitle}>
                Тепер час почати його наповнювати. <br />
                Розкажіть більше про себе, додайте ваші унікальні товари,
                яскраві фото, опис
              </p>
              <div className={`${s.modal_hint} ${s.modal_hint_success}`}>
                <i>
                  <Icon icon='solar:info-circle-outline' />
                </i>
                <p>Пам’ятайте, чим більше деталей, тим краще!</p>
              </div>
              <ButtonUI label='Гаразд' className={s.modal_btn} />
            </>
          )}
        </Modal>
      )}
    </section>
  );
};
