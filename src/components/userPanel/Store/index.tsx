import { useState } from 'react';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Modal } from '@/components/Modal';
import { NewStoreForm } from './NewStoreForm';
import s from './Store.module.scss';

export const Store = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <div>
      <h1 className='user-panel-title'>Управління магазином</h1>
      <div className={s.block}>
        <h2 className={s.block_title}>
          Приєднуйтеся до нашої спільноти та розширюйте ваш бізнес разом з нами!
        </h2>
        <p className={s.block_text}>
          На нашому маркетплейсі ви маєте можливість не лише купувати товари,
          але й створювати власні магазини та представляти свої товари на нашому
          сервісі.
        </p>
        <ButtonUI label='Створити магазин' onClick={toggleModal} />
      </div>
      {isModalOpen && (
        <Modal isOpen={isModalOpen}>
          <div className={s.modal}>
            <h2 className={s.modal_title}>Створення магазину</h2>
            <p className={s.modal_subtitle}>
              Заповніть всі поля нижче, щоб створити свій профіль
            </p>
            <NewStoreForm />
            <p className={s.modal_text}>
              Реєструючись, ви погоджуєтеся з угодою користувача і політикою
              конфіденційності маркетплейсу store.ua
            </p>
            <button
              type='submit'
              className={s.modal_close}
              onClick={toggleModal}
            >
              X
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
};
