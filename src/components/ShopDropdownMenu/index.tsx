import { ShopDropdownMenuProps } from '@/types';
import s from './ShopDropdownMenu.module.scss';
import { storePanelButtonsList } from '@/constants/storePanelButtonsList';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@iconify/react';

export const ShopDropdownMenu = ({ setDropdownOpen }: ShopDropdownMenuProps) => {
  return (
    <div className={s.shopDropdownMenu} onClick={() => setDropdownOpen(false)}>
      <div>
        {storePanelButtonsList.map((button) => (
          <NavLink
            to={`/account/store/${button.pathToPage}`}
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
        <Link to='/account/store' className='dropdown-menu_btn'>
          <Icon icon='solar:square-top-down-outline' />
          Мій магазин
        </Link>
      </div>
    </div>
  );
};
