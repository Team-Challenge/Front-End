import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { closeModal } from '@/store/modalSlice';
import { UserSettingsForm } from '@/components/userPanel/UserSettingsForm';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { DataChangeNotificationModal } from '@/components/DataChangeNotificationModal';
import s from './Settings.module.scss';

export const Settings = () => {
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.modal.dataUserChangeNotification,
  );

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
        <DataChangeNotificationModal
          isSuccessfulChange={isSuccessfulChange}
          modalId='dataUserChangeNotification'
        />
      )}
    </section>
  );
};
