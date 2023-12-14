import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { Link, NavLink } from 'react-router-dom';
import { UserDropdownMenuProps } from '@/types';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';
import { ButtonUI } from '../UI/ButtonUI';
import s from './UserDropdownMenu.module.scss';
import { Icon } from '@iconify/react';
import { userLogout } from '@/store/userProfile/userProfileThunks';

export const UserDropdownMenu = ({ handleOpenModal, setDropdownOpen }: UserDropdownMenuProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(userLogout());
  };

  return (
    <div className={s.dropdown} onClick={() => setDropdownOpen(false)}>
      {isAuth ? (
        <div className={s.dropdown_menu}>
          {userPanelButtonsList.map((button) => (
            <NavLink
              to={`account/${button.pathToPage}`}
              key={button.id}
              className={({ isActive }) =>
                isActive
                  ? `dropdown-menu_btn dropdown-menu_active`
                  : 'dropdown-menu_btn'
              }
            >
              {button.icon}
              {button.title}
            </NavLink>
          ))}
          <Link to='/' className='dropdown-menu_btn' onClick={logoutUser}>
            <Icon icon='solar:logout-2-outline' />
            Вийти
          </Link>
        </div>
      ) : (
        <div className={s.dropdown_auth}>
          <ButtonUI label='Увійти' onClick={() => handleOpenModal('login')} />
          <div className={s.dropdown_auth_registration}>
            <p>Вперше тут?</p>
            <button onClick={() => handleOpenModal('registration')}>
              Зареєструватися
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
