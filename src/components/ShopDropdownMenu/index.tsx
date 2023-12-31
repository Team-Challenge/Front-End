import { useRef } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeComponent } from '@/store/overlayStateSlice';
import { storePanelButtonsList } from '@/constants/storePanelButtonsList';
import { Icon } from '@iconify/react';
import s from './ShopDropdownMenu.module.scss';

export const ShopDropdownMenu = () => {
  const dispatch = useAppDispatch();
  const dropdownRef = useRef(null);

  const handleCloseDropdown = () => {
    dispatch(closeComponent('isShopDropdown'));
  };

  useClickOutside(dropdownRef, handleCloseDropdown);

  return (
    <div
      ref={dropdownRef}
      className={s.shopDropdownMenu}
      onClick={handleCloseDropdown}
    >
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
