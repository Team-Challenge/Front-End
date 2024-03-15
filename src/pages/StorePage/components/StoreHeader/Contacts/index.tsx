import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useAppSelector } from '@/hooks/reduxHook';
import { copyToClipboard } from '@/utils/copyToClipboard';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { Toast } from '@/components/UI';
import s from './Contacts.module.scss';

export const Contacts = ({ hideText }: { hideText: number }) => {
  const phoneNumber = useAppSelector(
    (state) => state.storeProfile.phone_number,
  );
  const instagram = useAppSelector((state) => state.storeProfile.link);
  const { width } = useWindowDimensions();
  const [showMessage, setShowMessage] = useState(false);
  const [toastType, setToastType] = useState('success');
  const [text, setText] = useState('Номер скопійовано');

  const copyNumber = (e: React.MouseEvent<HTMLElement>) => {
    if (e.target !== e.currentTarget) {
      return;
    }
    copyToClipboard(phoneNumber)
      .then((data) => {
        if (data) {
          setToastType('success');
          setText('Номер скопійовано');
          setShowMessage(true);
        }
      })
      .catch(() => {
        setToastType('error');
        setText('Помилка копіювання номера');
        setShowMessage(true);
      });
  };

  return (
    <div className={s.contacts}>
      {width > hideText && <p>Зв’язатися зі мною</p>}

      {width > 479.98 ? (
        <button type='button' onClick={copyNumber}>
          <Icon icon='solar:phone-outline' />
          <Toast
            message={text}
            toastType={toastType}
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
