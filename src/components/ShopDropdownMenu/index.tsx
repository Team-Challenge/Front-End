import { ShopDropdownMenuProps } from '@/types';
import s from './ShopDropdownMenu.module.scss';
import { storePanelButtonsList } from '@/constants/storePanelButtonsList';
import { NavLink } from 'react-router-dom';

export const ShopDropdownMenu = ({ setDropdownOpen }: ShopDropdownMenuProps) => {

  
  return (
    <div className={s.shopDropdown}>
      {true ? (
        <div>
          {storePanelButtonsList.map((button) => (
            <NavLink
              to={button.pathToPage}
              key={button.id}
              onClick={() => setDropdownOpen(false)}
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
          <div className='cabinet-sidebar-nav_btn'>shop</div>
        </div>
      ) : null}
    </div>
  );
};
