import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { closeComponent } from '@/store/overlayStateSlice';
import { UserProfileMenuProps } from '@/types';
import { getUserPanelButtonsList } from '@/constants/userPanelButtonsList';
import { Icon } from '@iconify/react';
import s from './BurgerMenu.module.scss';

export const UserProfileMenu = ({
  closeUserMenu,
}: UserProfileMenuProps) => {
  const dispatch = useAppDispatch();
  const userPanelButtonsList = getUserPanelButtonsList();

  const logoutUser = () => {
    dispatch(userLogout());
    dispatch(closeComponent('isBurgerMenu'));
  };

  const closeBurgerMenu = () => {
    dispatch(closeComponent('isBurgerMenu'));
  };

  const handleLogoutClick = () => {
    logoutUser();
    closeUserMenu();
  };

  return (
    <div className={s.profile}>
      <button
        className={`${s.profile_item} ${s.profile_return}`}
        onClick={closeUserMenu}
      >
        <Icon icon='solar:alt-arrow-right-outline' />
        Мій профіль
      </button>
      <ul className={s.profile_list}>
        {userPanelButtonsList.map((item) => (
          <Link
            key={item.id}
            to={`account/${item.pathToPage}`}
            onClick={closeBurgerMenu}
            className={s.profile_item}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
      </ul>
      <div className={`${s.button_logout} ${s.profile_logout}`}>
        <Link to='/' className={s.profile_item} onClick={handleLogoutClick}>
          <Icon icon='solar:logout-2-outline' className={s.menu_icon}/>
          Вийти
        </Link>
      </div>
    </div>
  );
};
