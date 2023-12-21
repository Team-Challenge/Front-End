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
import { openModal } from '@/store/modalSlice';
import { SettingsFormData } from '@/types';
import { UserPassword } from './UserPassword';
import { UserPhoneNumber } from './UserPhoneNumber';
import { UserDeliveryData } from './UserDeliveryData';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { DataChangeNotificationModal } from '@/components/DataChangeNotificationModal';
import s from './Settings.module.scss';

export const Settings = () => {
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.modal.dataUserChangeNotification,
  );

  const methods = useForm<SettingsFormData>({
    mode: 'onChange',
  });
  const { watch, reset } = methods;

  const newPassword = watch('new_password');
  const phoneNumber = watch('phoneNumber');

  const onSubmit = (data: SettingsFormData) => {
    if (phoneNumber) {
      dispatch(changePhoneNumber(data.phoneNumber)).then((response) => {
        if (response.payload) {
          setIsSuccessfulChange(true);
          reset();
        } else {
          setIsSuccessfulChange(false);
        }
        dispatch(openModal('dataUserChangeNotification'));
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
        dispatch(openModal('dataUserChangeNotification'));
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
          <UserPassword />
          <UserPhoneNumber />
          <UserDeliveryData />
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
        <DataChangeNotificationModal
          isSuccessfulChange={isSuccessfulChange}
          modalId='dataUserChangeNotification'
        />
      )}
    </section>
  );
};
