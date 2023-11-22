import { useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userSettings/userSettingsThunks';
import { buttonsUserPanel } from '@/constants/buttonsUserPanel';
import s from './UserPanel.module.scss';

export const UserPanel = () => {
  const [selectedComponent, setSelectedComponent] = useState<ReactNode>(
    buttonsUserPanel[0].content,
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
      navigate('/');
    }
  };

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
