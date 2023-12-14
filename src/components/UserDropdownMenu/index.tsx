import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { openModal } from '@/store/modalSlice';
import { closeComponent } from '@/store/overlayStateSlice';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';
import { ButtonUI } from '../UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './UserDropdownMenu.module.scss';

export const UserDropdownMenu = () => {
  const dropdownRef = useRef(null);
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const handleOpenModal = (id: string) => {
    dispatch(openModal(id));
    dispatch(closeComponent('isUserDropdown'));
    dispatch(closeComponent('isShopDropdown'));
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
      className={s.dropdown}
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
          <ButtonUI label='Увійти' onClick={() => handleOpenModal('isLogin')} />
          <div className={s.dropdown_auth_registration}>
            <p>Вперше тут?</p>
            <button onClick={() => handleOpenModal('isRegistration')}>
              Зареєструватися
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
