import { Link, NavLink } from 'react-router-dom';
import { storePanelButtonsList } from '@/constants/storePanelButtonsList';
import { Icon } from '@iconify/react';
import s from './StorePanel.module.scss';

export const StorePanel = () => {
  return (
    <aside className='cabinet-sidebar-nav'>
      <Link
        to='/account/profile'
        className={`cabinet-sidebar-nav_btn ${s.button_return}`}
      >
        <Icon icon='solar:alt-arrow-left-outline' />
        В мій профіль
      </Link>
      <span className='cabinet-sidebar-nav_line' />
      {storePanelButtonsList.map((button) => (
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
    </aside>
  );
};
