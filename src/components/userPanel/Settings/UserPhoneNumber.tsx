import { useAppSelector } from '@/hooks/reduxHook';
import { PHONE_NUMBER_REGEX } from '@/constants/RegExp';
import { TextInput } from '@/components/UI/TextInput';
import s from './Settings.module.scss';

export const UserPhoneNumber = () => {
  const userPhoneNumber = useAppSelector((state) => state.userSettings.phone_number);

  return (
    <label className={s.form_label}>
      Особисті дані
      {userPhoneNumber && (
        <>
          <p className={s.form_hints}>
            {userPhoneNumber
              ? 'Змінити номер телефону'
              : 'Додати номер телефону'}
          </p>
          <p>{userPhoneNumber}</p>
        </>
      )}
      <TextInput
        type='text'
        id='phoneNumber'
        placeholder='Номер телефону'
        regex={PHONE_NUMBER_REGEX}
        errorMessage='Будь ласка, введіть справний український номер телефону, який розпочинається з +380'
      />
    </label>
  );
};
