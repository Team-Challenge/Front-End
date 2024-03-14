import { useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { ButtonUI } from '@/components/UI';
import { DataChangeNotificationModal } from '@/components/DataChangeNotificationModal';
import { UserSettingsForm } from '../components/UserSettingsForm';
import s from './Settings.module.scss';

export const Settings = () => {
  const { width } = useWindowDimensions();
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const isModalOpen = useAppSelector(
    (state) => state.modal.dataUserChangeNotification,
  );

  return (
    <section className={s.settings}>
      {width >= 991.98 && <h4 className={s.settings_title}>Налаштування</h4>}
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
