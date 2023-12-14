import { Link, NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { openModal } from '@/store/modalSlice';
import { closeComponent } from '@/store/overlayStateSlice';
import { getUserPanelButtonsList } from '@/constants/userPanelButtonsList';
import { ButtonUI } from '../UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './UserDropdownMenu.module.scss';

export const UserDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);
  const userPanelButtonsList = getUserPanelButtonsList();

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

  return (
    <div className={s.dropdown} onClick={handleCloseDropdown}>
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
