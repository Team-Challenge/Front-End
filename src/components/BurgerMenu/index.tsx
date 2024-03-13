import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { closeComponent } from '@/store/overlayStateSlice';
import { categoryList } from '@/constants';
import { ButtonUI } from '../UI';
import s from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { hasStore } = useAppSelector((state) => state.storeProfile);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectedCategory = (id: number) => {
    if (selectedCategory === id) {
      setSelectedCategory(null);
    } else {
      setSelectedCategory(id);
    }
  };

  const handleCloseMenu = () => {
    dispatch(closeComponent('isBurgerMenu'));
  };

  const handleOpenModal = (id: string) => {
    dispatch(openModal(id));
    handleCloseMenu();
  };

  const logoutUser = () => {
    dispatch(userLogout());
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={`${s.menu} ${isAuth ? s.menu_personal : s.menu_generic}`}>
      <ul className={s.category_list}>
        {categoryList.map(({ id, icon, label, subcategories }) =>
          id !== 6 ? (
            <li key={id}>
              <button
                type='button'
                className={s.category_item}
                onClick={() => handleSelectedCategory(id)}
              >
                <img src={icon} alt={label} className={s.icon} />
                <p className={s.label}>{label}</p>
                <Icon
                  icon='solar:alt-arrow-right-outline'
                  className={`${s.category_arrow} ${
                    selectedCategory === id ? s.open : s.closed
                  }`}
                />
              </button>
              {selectedCategory === id && selectedCategory !== 6 && (
                <ul className={s.subcategory_list}>
                  <li className={s.subcategory_link}>
                    <Link to='/' className={s.subcategory_link_all}>
                      Всі прикраси <span>{label}</span>
                    </Link>
                  </li>
                  {subcategories &&
                    subcategories.map((subcategory) => (
                      <li key={subcategory} className={s.subcategory_link}>
                        <Link to='/'>{subcategory}</Link>
                      </li>
                    ))}
                </ul>
              )}
            </li>
          ) : (
            <li className={s.category_item} key={id}>
              <img src={icon} alt='Набори' className={s.icon} />
              <p className={s.label}>{label}</p>
            </li>
          ),
        )}
      </ul>

      {width <= 479.98 && isAuth && (
        <div className={s.button_wrap}>
          <div className={s.button_wrap_panel}>
            <Link
              to='/account/profile'
              className={s.button_user}
              onClick={handleCloseMenu}
            >
              <Icon icon='solar:user-rounded-outline' className={s.icon} />

              <p className={s.label}>Мій профіль</p>
            </Link>

            {hasStore && (
              <Link
                to='/account/store'
                className={s.button_store}
                onClick={handleCloseMenu}
              >
                <Icon icon='solar:shop-2-outline' className={s.icon} />
                <p className={s.label}>Мій магазин</p>
              </Link>
            )}
          </div>

          <div className={s.button_logout}>
            <Link to='/' onClick={logoutUser} className={s.button_logout_link}>
              <Icon icon='solar:logout-2-outline' className={s.icon} />
              <p className={s.label}>Вийти</p>
            </Link>
          </div>
        </div>
      )}

      {width <= 479.98 && !isAuth && (
        <div className={s.button_auth}>
          <ButtonUI label='Увійти' onClick={() => handleOpenModal('isLogin')} />
          <ButtonUI
            label='Зареєструватися'
            variant='secondary'
            onClick={() => handleOpenModal('isRegistration')}
          />
        </div>
      )}
    </div>
  );
};
