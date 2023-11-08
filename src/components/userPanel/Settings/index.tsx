import { useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { Modal } from '@/components/Modal';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { useAppDispatch } from '@/hooks/reduxHook';
import {
  changePassword,
  changePhoneNumber,
} from '@/store/userSettings/userSettingsThunks';
import { SettingsFromData, SettingsProps } from '@/types';
import { UserPassword } from './UserPassword';
import { UserPhoneNumber } from './UserPhoneNumber';
import s from './Settings.module.scss';

export const Settings = ({ userPhone }: SettingsProps) => {
  const [message, setMessage] = useState<string>('');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const dispatch = useAppDispatch();

  const methods = useForm<SettingsFromData>({
    mode: 'onChange',
  });

  const newPassword = methods.watch('new_password');
  const phoneNumber = methods.watch('phoneNumber');

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const onSubmit = (data: SettingsFromData) => {
    if (phoneNumber) {
      dispatch(changePhoneNumber(data.phoneNumber)).then((response) => {
        if (response.payload) {
          setMessage('Ваші дані успішно оновлено');
          methods.reset();
        } else {
          setMessage('Виникла помилка, спробуйте ще раз');
        }
        setIsModalOpen(true);
      });
    }

    if (newPassword) {
      dispatch(
        changePassword({
          currentPassword: data.current_password,
          newPassword: data.new_password,
        }),
      ).then((response) => {
        if (response.payload) {
          setMessage('Ваші дані успішно оновлено');
          methods.reset();
        } else {
          setMessage('Виникла помилка, невірний старий пароль');
        }
        setIsModalOpen(true);
      });
    }
  };

  return (
    <div className={s.settings}>
      <h1 className='user-panel-title'>Налаштування входу</h1>
      <FormProvider {...methods}>
        <form
          id='settings'
          className={s.form}
          onSubmit={methods.handleSubmit(
            onSubmit as SubmitHandler<FieldValues>,
          )}
        >
          <UserPassword />
          <UserPhoneNumber userPhone={userPhone} />
          <ButtonUI label='Зберігти' className={s.form_btn} />
        </form>
      </FormProvider>

      <ButtonUI
        label='Видалити профіль'
        variant='secondary'
        className={s.btn_delete}
      />

      {isModalOpen && message !== '' && (
        <Modal isOpen={isModalOpen}>
          <div className={s.modal}>
            <div className={s.modal_subtitle}>{message}</div>
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
