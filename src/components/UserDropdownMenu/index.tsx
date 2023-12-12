import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { UserDropdownMenuProps } from '@/types';
import { ButtonUI } from '../UI/ButtonUI';
import s from './UserDropdownMenu.module.scss';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { userLogout } from '@/store/userProfile/userProfileThunks';

export const UserDropdownMenu = ({ handleOpenModal, setDropdownOpen }: UserDropdownMenuProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(userLogout());
  };

  return (
    <div className={s.dropdownMenu} onClick={() => setDropdownOpen(false)}>
      {isAuth ? (
        <div>
          {userPanelButtonsList.map((button) => (
            <NavLink
              to={`account/${button.pathToPage}`}
              key={button.id}
              className={({ isActive }) =>
                isActive
                  ? `cabinet-sidebar-nav_btn cabinet-sidebar-nav_active`
                  : 'cabinet-sidebar-nav_btn'
              }
            >
              {button.icon}
              {button.title}
            </NavLink>
          ))}
          <span className='cabinet-sidebar-nav_line' />
          <Link to='/' className='cabinet-sidebar-nav_btn' onClick={logoutUser}>
            <Icon icon='solar:logout-2-outline' />
            Вийти
          </Link>
        </div>
      ) : (
        <div className={s.dropdownMenu_auth}>
          <ButtonUI label='Увійти' onClick={() => handleOpenModal(true)} />
          <div className={s.dropdownMenu_auth_registration}>
            <p>Вперше тут?</p>
            <button onClick={() => handleOpenModal(false)}>
              Зареєструватися
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
