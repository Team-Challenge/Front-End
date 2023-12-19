import { useState } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import {
  changePassword,
  changePhoneNumber,
  getUserInfo,
} from '@/store/userProfile/userProfileThunks';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { closeModal, openModal } from '@/store/modalSlice';
import { SettingsFormData } from '@/types';
import { UserPassword } from './UserPassword';
import { UserPhoneNumber } from './UserPhoneNumber';
import { UserDeliveryData } from './UserDeliveryData';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Modal } from '@/components/Modal';
import s from './Settings.module.scss';

export const Settings = () => {
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector((state) => state.modal.settingsMessage);

  const methods = useForm<SettingsFormData>({
    mode: 'onChange',
  });
  const { watch, reset } = methods;

  const newPassword = watch('new_password');
  const phoneNumber = watch('phone_number');

  const closeModalWindow = () => {
    dispatch(closeModal('settingsMessage'));
  };

  const onSubmit = (data: SettingsFormData) => {
    if (phoneNumber) {
      dispatch(changePhoneNumber(data.phone_number)).then((response) => {
        if (response.payload) {
          setIsSuccessfulChange(true);
          reset();
        } else {
          setIsSuccessfulChange(false);
        }
        dispatch(openModal('settingsMessage'));
        dispatch(getUserInfo());
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
          setIsSuccessfulChange(true);
          reset();
        } else {
          setIsSuccessfulChange(false);
        }
        dispatch(openModal('settingsMessage'));
      });
    }
  };

  return (
    <section className={s.settings}>
      <h4 className={s.settings_title}>Налаштування</h4>
      <FormProvider {...methods}>
        <form
          id='settings'
          className={s.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <div className={s.form_wrap}>
            <p className={s.form_subtitle}>Зміна пароля</p>
            <UserPassword />
          </div>

          <div className={s.form_wrap}>
            <p className={s.form_subtitle}>Особисті дані</p>
            <UserPhoneNumber />
            <UserDeliveryData />
          </div>

          <ButtonUI
            type='submit'
            label='Зберегти'
            className={s.form_btn}
            onClick={methods.handleSubmit(
              onSubmit as SubmitHandler<FieldValues>,
            )}
          />
        </form>
      </FormProvider>

      <ButtonUI
        label='Видалити свій профіль'
        variant='secondary'
        className={s.form_btn_delete}
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
