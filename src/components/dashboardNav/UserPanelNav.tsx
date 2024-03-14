import { getUserPanelButtonsList } from '@/constants';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { Link, NavLink } from 'react-router-dom';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { Icon } from '@iconify/react';
import s from './DashboardNav.module.scss';

export const UserPanelNav = () => {
  const { width } = useWindowDimensions();
  const dispatch = useAppDispatch();
  const hasStore = useAppSelector((state) => state.storeProfile.name);
  const userPanelButtonsList = getUserPanelButtonsList(!!hasStore);

  const logoutUser = () => {
    dispatch(userLogout());
  };

  return width >= 991.98 ? (
    <nav className={s.nav}>
      <ul className={s.nav_sidebar}>
        {userPanelButtonsList.map((button) => (
          <li key={button.id}>
            <NavLink
              to={button.pathToPage}
              className={({ isActive }) =>
                isActive
                  ? `${s.nav_button} ${s.nav_button_active}`
                  : s.nav_button
              }
            >
              {button.icon}
              {button.title}
            </NavLink>
          </li>
        ))}
      </ul>
      <div className={s.button_logout}>
        <Link to='/' className={s.nav_button} onClick={logoutUser}>
          <Icon icon='solar:logout-2-outline' />
          Вийти
        </Link>
      </div>
    </nav>
  ) : (
    <>
      <h2 className={s.title}>Мій профіль</h2>
      <nav className={s.menu}>
        <ul className={s.menu_list}>
          {userPanelButtonsList.map((button) => (
            <li key={button.id} className={s.menu_item}>
              <NavLink
                to={button.pathToPage}
                className={({ isActive }) =>
                  isActive
                    ? `${s.menu_button} ${s.menu_button_active}`
                    : s.menu_button
                }
              >
                {button.title}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
};
