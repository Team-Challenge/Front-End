import { useAppSelector } from '@/hooks/reduxHook';
import { PhoneNumber } from '@/components/PhoneNumber';
import s from './UserSettingsForm.module.scss';

export const UserPhoneNumber = () => {
  const userPhoneNumber = useAppSelector(
    (state) => state.userProfile.phone_number,
  );

  return (
    <div className={s.block}>
      {userPhoneNumber && (
        <p className={s.hints}>
          {userPhoneNumber ? 'Змінити номер телефону' : 'Додати номер телефону'}
        </p>
      )}
      <PhoneNumber userPhoneNumber={userPhoneNumber} />
    </div>
  );
};
