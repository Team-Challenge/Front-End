import { Link } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { useToggleMenu } from '@/hooks/useToggleMenu';
import { categoryList } from '@/constants/categoryList';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { ShopDropdownMenu } from '../ShopDropdownMenu';
import { Modal } from '../Modal';
import LogoImg from '../../assets/logo.svg';
import { Icon } from '@iconify/react';
import s from './Header.module.scss';

export const Header = () => {
  const { width } = useWindowDimensions();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { hasStore } = useAppSelector((state) => state.storeProfile);

  const [isShopDropdownOpen, toggleShopMenu] = useToggleMenu('isShopDropdown');
  const [isUserDropdownOpen, toggleUserMenu] = useToggleMenu('isUserDropdown');
  const [isBurgerMenuOpen, toggleBurgerMenu] = useToggleMenu('isBurgerMenu');

  const isLoginModalOpen = useAppSelector((state) => state.modal.isLogin);
  const isRegistrationModalOpen = useAppSelector(
    (state) => state.modal.isRegistration,
  );

  return (
    <header className={s.header}>
      <div className={`container ${s.header_container}`}>
        <Link to='/' className={s.header_logo}>
          <img src={LogoImg} alt='До речі' />
        </Link>

        <ul className={s.header_categories}>
          {categoryList.map((item) => (
            <li key={item.id}>{item.label}</li>
          ))}
        </ul>

        {width <= 991.98 && (
          <div className={s.header_burger}>
            <button
              onClick={(event) => toggleBurgerMenu(event)}
              className={`${s.icon_burger} ${
                isBurgerMenuOpen ? s.open : s.closed
              }`}
            >
              <span className={s.icon_bar} />
              <span className={s.icon_bar} />
              <span className={s.icon_bar} />
            </button>
            <button>
              <Icon icon='solar:magnifer-outline' />
            </button>
          </div>
        )}

        <div className={s.header_buttons}>
          <button className={s.icon_search}>
            <Icon icon='solar:magnifer-outline' />
          </button>

          {width >= 479.98 && (
            <>
              {isAuth && hasStore && (
                <div className={`${s.icon_shop} ${s.header_dropdown}`}>
                  <button onClick={(event) => toggleShopMenu(event)}>
                    <Icon icon='solar:shop-2-outline' />
                    <Icon
                      icon='solar:alt-arrow-down-outline'
                      className={
                        isShopDropdownOpen ? 'icon_open' : 'icon_close'
                      }
                    />
                  </button>
                  {isShopDropdownOpen && <ShopDropdownMenu />}
                </div>
              )}

              <div className={`${s.icon_user} ${s.header_dropdown}`}>
                <button onClick={(event) => toggleUserMenu(event)}>
                  <Icon icon='solar:user-outline' />
                  <Icon
                    icon='solar:alt-arrow-down-outline'
                    className={isUserDropdownOpen ? 'icon_open' : 'icon_close'}
                  />
                </button>
                {isUserDropdownOpen && <UserDropdownMenu />}
              </div>
            </>
          )}

          <button className={s.icon_favorite}>
            <Icon icon='solar:heart-outline' />
          </button>
          <button className={s.icon_cart}>
            <Icon icon='solar:bag-5-outline' />
          </button>
        </div>
      </div>

      {isLoginModalOpen && (
        <Modal modalId='isLogin'>
          <SignIn />
        </Modal>
      )}
      {isRegistrationModalOpen && (
        <Modal modalId='isRegistration'>
          <SignUp />
        </Modal>
      )}
    </header>
  );
};
