import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { openModal } from '@/store/modalSlice';
import { closeComponent } from '@/store/overlayStateSlice';
import { getUserPanelButtonsList } from '@/constants/userPanelButtonsList';
import { Icon } from '@iconify/react';
import { ButtonUI } from '../UI/ButtonUI';
import s from './UserDropdownMenu.module.scss';

export const UserDropdownMenu = () => {
  const userPanelButtonsList = getUserPanelButtonsList();
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  const handleOpenModal = (id: string) => {
    dispatch(openModal(id));
  };

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
      className={`dropdown-menu ${s.dropdown}`}
      onClick={handleCloseDropdown}
    >
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
          <ButtonUI
            label='Увійти'
            onClick={() => handleOpenModal('isLogin')}
            className={s.dropdown_auth_login}
          />
          <div className={s.dropdown_auth_registration}>
            <p>Вперше тут?</p>
            <button
              type='button'
              onClick={() => handleOpenModal('isRegistration')}
            >
              Зареєструватися
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
