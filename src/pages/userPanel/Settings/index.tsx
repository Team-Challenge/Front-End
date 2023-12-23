import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { UserSettingsForm } from '@/components/userPanel/UserSettingsForm';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Modal } from '@/components/Modal';
import s from './Settings.module.scss';

export const Settings = () => {
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.settingsMessage);

  const closeModalWindow = () => {
    dispatch(closeModal('settingsMessage'));
  };

  return (
    <section className={s.settings}>
      <h4 className={s.settings_title}>Налаштування</h4>
      <UserSettingsForm changeDataResult={setIsSuccessfulChange} />

      <ButtonUI
        label='Видалити свій профіль'
        variant='secondary'
        className={s.button_delete}
        disabled
      />

      {isModalOpen && (
        <Modal modalId='settingsMessage' className={s.modal}>
          {isSuccessfulChange ? (
            <>
              <OrnamentalTitle tag='h4' text='Зміни збережено' />
              <p className={s.modal_text}>
                Ваші нові дані успішно збережено. <br /> Приємного користування!
              </p>
              <ButtonUI
                label='Готово!'
                onClick={closeModalWindow}
                className={s.modal_button}
              />
            </>
          ) : (
            <>
              <OrnamentalTitle tag='h4' text='Щось пішло не так...' />
              <p className={s.modal_text}>
                Вибачте, виникла помилка при спробі змінити ваші дані. Будь
                ласка, перевірте інформацію та спробуйте ще раз.
              </p>
              <ButtonUI
                label='Повторити'
                onClick={closeModalWindow}
                className={s.modal_button}
              />
            </>
          )}
        </Modal>
      )}
    </section>
  );
};
