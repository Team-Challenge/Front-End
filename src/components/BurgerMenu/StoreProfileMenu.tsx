import { Link } from 'react-router-dom';
import { useAppDispatch } from '@/hooks/reduxHook';
import { closeComponent } from '@/store/overlayStateSlice';
import { StoreProfileMenuProps } from '@/types';
import { storePanelButtonsList } from '@/constants/storePanelButtonsList';
import { Icon } from '@iconify/react';
import s from './BurgerMenu.module.scss';

export const StoreProfileMenu = ({ closeStoreMenu }: StoreProfileMenuProps) => {
  const dispatch = useAppDispatch();

  const closeBurgerMenu = () => {
    dispatch(closeComponent('isBurgerMenu'));
  };

  return (
    <div className={s.profile}>
      <button
        className={`${s.profile_item} ${s.profile_return}`}
        onClick={closeStoreMenu}
      >
        <Icon icon='solar:alt-arrow-right-outline' />
        Мій магазин
      </button>
      <ul className={`${s.profile_list}`} onClick={closeBurgerMenu}>
        {storePanelButtonsList.map((item) => (
          <Link
            key={item.id}
            to={`/account/store/${item.pathToPage}`}
            className={`${s.profile_item}`}
          >
            {item.icon}
            {item.title}
          </Link>
        ))}
        <Link to={`/account/store`} className={s.profile_item}>
          <Icon icon='solar:square-top-down-outline' />
          Переглянути мій магазин
        </Link>
      </ul>
    </div>
  );
};
