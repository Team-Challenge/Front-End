import { SettingsProps } from '@/types';
import { TextInput } from '@/components/UI/TextInput';
import s from './Settings.module.scss';

export const UserPhoneNumber = () => {
  return (
    <label className={s.form_label}>
      Особисті дані
      {/* {userPhone && (
        <>
          <p className={s.form_hints}>
            {userPhone ? 'Змінити номер телефону' : 'Додати номер телефону'}
          </p>
          <p>{userPhone}</p>
        </>
      )} */}
      <TextInput
        type='text'
        id='phoneNumber'
        placeholder='Новий номер'
        regex={/^\+380\d{9}$/}
        errorMessage='Будь ласка, введіть справний український номер телефону, який розпочинається з +380'
      />
    </label>
  );
};
