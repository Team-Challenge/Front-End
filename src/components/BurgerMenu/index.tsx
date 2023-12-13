import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { userLogout } from '@/store/userProfile/userProfileThunks';
import { closeComponent } from '@/store/overlayStateSlice';
import { openModal } from '@/store/modalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useMenuHandler } from '@/hooks/useMenuHandler';
import { categoryList } from '@/constants/categoryList';
import { ButtonUI } from '../UI/ButtonUI';
import { UserProfileMenu } from './UserProfileMenu';
import { StoreProfileMenu } from './StoreProfileMenu';
import { Icon } from '@iconify/react';
import s from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  const dispatch = useAppDispatch();
  const { isAuth } = useAppSelector((state) => state.auth);

  const { width } = useWindowDimensions();
  const [isUserMenuOpen, openUserMenu, closeUserMenu] = useMenuHandler();
  const [isStoreMenuOpen, openStoreMenu, closeStoreMenu] = useMenuHandler();

  const handleOpenModal = (id: string) => {
    dispatch(openModal(id));
    dispatch(closeComponent('burgerMenu'));
  };

  const logoutUser = () => {
    dispatch(userLogout());
    dispatch(closeComponent('burgerMenu'));
  };

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, []);

  return (
    <div className={s.menu}>
      {!isUserMenuOpen && !isStoreMenuOpen && (
        <div className={s.menu_wrap}>
          <ul className={s.menu_list}>
            {categoryList.map(({ id, icon, label }) => (
              <li key={id} className={s.menu_item}>
                <img src={icon} alt='X' className={s.menu_icon} />
                <p>{label}</p>
                <Icon
                  icon='solar:alt-arrow-right-outline'
                  className={s.menu_arrow}
                />
              </li>
            ))}
          </ul>

          {width <= 479.98 && (
            <div
              className={`${s.menu_buttons} ${
                !isAuth ? s.menu_buttons_auth : s.menu_buttons_account
              }`}
            >
              {!isAuth ? (
                <div className={s.buttons_auth}>
                  <ButtonUI
                    label='Увійти'
                    onClick={() => handleOpenModal('login')}
                  />
                  <ButtonUI
                    label='Зареєструватися'
                    variant='secondary'
                    onClick={() => handleOpenModal('registration')}
                  />
                </div>
              ) : (
                <>
                  <div className={s.buttons_account}>
                    <ul className={s.account_list}>
                      <li className={s.account_item} onClick={openUserMenu}>
                        <Icon
                          icon='solar:user-circle-outline'
                          className={s.menu_icon}
                        />
                        Мій профіль
                        <Icon
                          icon='solar:alt-arrow-right-outline'
                          className={s.menu_arrow}
                        />
                      </li>
                      <li className={s.account_item} onClick={openStoreMenu}>
                        <Icon
                          icon='solar:shop-2-outline'
                          className={s.menu_icon}
                        />
                        Мій магазин
                      </li>
                    </ul>
                  </div>
                  <div className={s.button_logout}>
                    <Link
                      to='/'
                      className={s.account_item}
                      onClick={logoutUser}
                    >
                      <Icon
                        icon='solar:logout-2-outline'
                        className={s.menu_icon}
                      />
                      Вийти
                    </Link>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      )}

      {isUserMenuOpen && <UserProfileMenu closeUserMenu={closeUserMenu} />}
      {isStoreMenuOpen && <StoreProfileMenu closeStoreMenu={closeStoreMenu} />}
    </div>
  );
};
