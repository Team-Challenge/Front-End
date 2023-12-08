import { useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAppDispatch } from '@/hooks/reduxHook';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';

export const UserPanel = () => {
  const dispatch = useAppDispatch();

  const logoutUser = () => {
    dispatch(userLogout());
  };

  return (
    <aside className='cabinet-sidebar-nav'>
      {userPanelButtonsList.map((button) => (
        <NavLink
          to={button.pathToPage}
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
    </aside>
  );
};
