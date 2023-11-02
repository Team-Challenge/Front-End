import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userSettings/userSettingsThunks';
import {
  Profile,
  Order,
  Messages,
  FavoriteProducts,
  Store,
  Settings,
} from '@/components/userPanel';
import { useAccountInfo } from '@/hooks/useAccountInfo';
import s from './UserPanel.module.scss';

export const UserPanel = () => {
  const accountInfo = useAccountInfo();

  const buttonData = [
    {
      id: '1',
      label: 'Профіль',
      content: <Profile userName={accountInfo?.full_name as string} />,
    },
    { id: '2', label: 'Ваші замовлення', content: <Order /> },
    { id: '3', label: 'Повідомлення', content: <Messages /> },
    { id: '4', label: 'Обрані товари', content: <FavoriteProducts /> },
    { id: '5', label: 'Мій магазин', content: <Store /> },
    {
      id: '6',
      label: 'Налаштування',
      content: <Settings userPhone={accountInfo?.phone_number as string} />,
    },
  ];

  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(
    buttonData[0].content,
  );

  const handleButtonClick = (content: ReactNode) => {
    setSelectedComponent(content);
  };

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(userLogout());
    if (!isAuth) {
      navigate('/signin');
    }
  };

  return (
    <section className={s.panel}>
      <div className={s.wrap}>
        {buttonData.map((button) => (
          <button
            type='submit'
            key={button.id}
            onClick={() => handleButtonClick(button.content)}
            className={`${s.btn} ${
              selectedComponent === button.content ? s.active : ''
            }`}
          >
            {button.label}
          </button>
        ))}
        <span className={s.line} />
        <button type='submit' className={s.btn} onClick={logoutUser}>
          Вийти
        </button>
      </div>
      {selectedComponent}
    </section>
  );
};
