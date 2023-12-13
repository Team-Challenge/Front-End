import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { closeComponent } from '@/store/overlayStateSlice';
import { UserDropdownMenuProps } from '@/types';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';
import { ButtonUI } from '../UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './UserDropdownMenu.module.scss';

export const UserDropdownMenu = ({
  handleOpenModal,
}: UserDropdownMenuProps) => {
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const logoutUser = () => {
    dispatch(userLogout());
    dispatch(closeComponent('isUserDropdown'));
  };

  const handleCloseDropdown = () => {
    dispatch(closeComponent('isUserDropdown'));
  };

  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div
      ref={dropdownRef}
      className={s.userDropdownMenu}
      onClick={handleCloseDropdown}
    >
      {isAuth ? (
        <div>
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
        <div className={s.userDropdownMenu_auth}>
          <ButtonUI label='Увійти' onClick={() => handleOpenModal('login')} />
          <div className={s.dropdownMenu_auth_registration}>
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
