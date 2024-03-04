import s from './Contacts.module.scss';
import { Icon } from '@iconify/react';
import { useAppSelector } from '@/hooks/reduxHook';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { Toast } from '../Toast';
import { useState } from 'react';

export const Contacts = () => {
  const phoneNumber = useAppSelector(
    (state) => state.storeProfile.phone_number,
  );
  const instagram = useAppSelector((state) => state.storeProfile.link);
  const { width } = useWindowDimensions();
  const [showMessage, setShowMessage] = useState(false);

  return (
    <div className={s.contacts}>
      {width > 991.98 && <p>Зв’язатися зі мною</p>}

      {width > 479.98 ? (
        <button
          type='button'
          onClick={(e) => {
            if (e.target !== e.currentTarget) {
              return;
            }
            copyToClipboard(phoneNumber)
              .then(() => setShowMessage(true))
              .catch((err) => console.log(err));
          }}
        >
          <Icon icon='solar:phone-outline' />
          <Toast
            message='Номер скопійовано'
            toastType='success'
            handleShowMessage={setShowMessage}
            isShow={showMessage}
          />
        </button>
      ) : (
        <a href={`tel:${phoneNumber}`}>
          <Icon icon='solar:phone-outline' />
        </a>
      )}

      {instagram && (
        <a href={instagram} rel='noopener noreferrer' target='_blank'>
          <Icon icon='iconoir:instagram' />
        </a>
      )}
    </div>
  );
};
