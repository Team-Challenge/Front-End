import { ShopDropdownMenuProps } from '@/types';
import s from './ShopDropdownMenu.module.scss';
import { storePanelButtonsList } from '@/constants/storePanelButtonsList';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const ShopDropdownMenu = ({ setDropdownOpen }: ShopDropdownMenuProps) => {

  
  return (
    <div className={s.shopDropdown} onClick={() => setDropdownOpen(false)}>
      {true ? (
        <div>
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
          <div className='cabinet-sidebar-nav_line' />
          <Link to='/account/store' className='cabinet-sidebar-nav_btn'>
            <Icon icon='solar:square-top-down-outline'/>
            Мій магазин
          </Link>
        </div>
      ) : null}
    </div>
  );
};
