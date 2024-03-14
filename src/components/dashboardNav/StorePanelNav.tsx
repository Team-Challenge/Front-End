import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { storePanelButtonsList } from '@/constants';
import s from './DashboardNav.module.scss';

export const StorePanelNav = () => {
  const { width } = useWindowDimensions();
  const { linkToStore } = useAppSelector((state) => state.storeProfile);

  return width >= 991.98 ? (
    <nav className={s.nav}>
      <div className={s.button_return}>
        <Link to='/account/profile' className={s.nav_button}>
          <Icon icon='solar:alt-arrow-left-outline' />В мій профіль
        </Link>
      </div>
      <ul className={s.nav_sidebar}>
        {storePanelButtonsList.map((button) => (
          <NavLink
            to={button.pathToPage}
            key={button.id}
            className={({ isActive }) =>
              isActive ? `${s.nav_button} ${s.nav_button_active}` : s.nav_button
            }
          >
            {button.icon}
            {button.title}
          </NavLink>
        ))}
      </ul>
      <div className={s.button_store}>
        <Link to={`/store/${linkToStore}`} className={s.nav_button}>
          <Icon icon='solar:square-top-down-outline' />
          Мій магазин
        </Link>
      </div>
    </nav>
  ) : (
    <>
      <h2 className={s.title}>Мій магазин</h2>
      <nav className={s.menu}>
        <ul className={s.menu_list}>
          {storePanelButtonsList.map((button) => (
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
