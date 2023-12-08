import { useAppSelector } from '@/hooks/reduxHook';
import { PHONE_NUMBER_REGEX } from '@/constants/RegExp';
import { TextInput } from '@/components/UI/TextInput';
import s from './Settings.module.scss';

export const UserPhoneNumber = () => {
  const userPhoneNumber = useAppSelector(
    (state) => state.userProfile.phone_number,
  );

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>Особисті дані</p>
      {userPhoneNumber && (
        <p className={s.form_hints}>
          {userPhoneNumber ? 'Змінити номер телефону' : 'Додати номер телефону'}
        </p>
      )}
      <TextInput
        type='text'
        id='phoneNumber'
        placeholder='Номер телефону'
        value={userPhoneNumber}
        required={false}
        regex={PHONE_NUMBER_REGEX}
        errorMessage='Будь ласка, введіть справний український номер телефону, який розпочинається з +380'
        editModeIcon
      />
    </div>
  );
};
