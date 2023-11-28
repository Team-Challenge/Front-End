import { useState, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userSettings/userSettingsThunks';
import { buttonsUserPanel } from '@/constants/buttonsUserPanel';
import { getAccountsInfo } from '@/services/UserProfileInfo';
import { setFullName, setPhoneNumber } from '@/store/userSettings/userSettingsSlice';
import s from './UserPanel.module.scss';


export const UserPanel = () => {
  const navigate = useNavigate();
  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(
    buttonsUserPanel[0].content,
  );

  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleButtonClick = (content: ReactNode) => {
    setSelectedComponent(content);
  };

  const logoutUser = () => {
    dispatch(userLogout());
    if (!isAuth) {
      navigate('/');
    }
  };

  useEffect(() => {
    getAccountsInfo()
      .then((data) => {
        dispatch(setFullName(data.full_name));
        dispatch(setPhoneNumber(data.phone_number));
      })
      .catch((error) => {
        console.error('Error:', error);
        return null;
      });
  }, []);

  return (
    <section className={s.panel}>
      <div className={s.wrap}>
        {buttonsUserPanel.map((button) => (
          <button
            key={button.id}
            onClick={() => handleButtonClick(button.content)}
            className={`${s.btn} ${
              selectedComponent === button.content ? s.active : ''
            }`}
          >
            {button.icon}
            {button.label}
          </button>
        ))}
        <span className={s.line} />
        <button className={s.btn} onClick={logoutUser}>
          <Icon icon='solar:logout-2-outline' />
          Вийти
        </button>
      </div>
      {selectedComponent}
    </section>
  );
};
