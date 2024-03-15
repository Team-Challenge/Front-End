import { DataChangeNotificationModalProps } from '@/types';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { Modal } from '../UI/Modal';
import { OrnamentalTitle } from '../UI/OrnamentalTitle';
import { ButtonUI } from '../UI/ButtonUI';
import s from './DataChangeNotificationModal.module.scss';

export const DataChangeNotificationModal = ({
  isSuccessfulChange,
  modalId,
}: DataChangeNotificationModalProps) => {
  const dispatch = useAppDispatch();

  const closeModalWindow = () => {
    dispatch(closeModal(modalId));
  };

  return (
    <Modal modalId={modalId} className={s.modal}>
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
            Вибачте, виникла помилка при спробі змінити ваші дані. Будь ласка,
            перевірте інформацію та спробуйте ще раз.
          </p>
          <ButtonUI
            label='Повторити'
            onClick={closeModalWindow}
            className={s.modal_button}
          />
        </>
      )}
    </Modal>
  );
};
