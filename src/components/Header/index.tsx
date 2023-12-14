import { Link } from 'react-router-dom';
import { openComponent, closeComponent } from '@/store/overlayStateSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
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
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();

  const isShopDropdownOpen = useAppSelector(
    (state) => state.overlayState.isShopDropdown,
  );
  const isUserDropdownOpen = useAppSelector(
    (state) => state.overlayState.isUserDropdown,
  );

  const isLoginModalOpen = useAppSelector((state) => state.modal.isLogin);
  const isRegistrationModalOpen = useAppSelector(
    (state) => state.modal.isRegistration,
  );

  const isBurgerMenuOpen = useAppSelector(
    (state) => state.overlayState.isBurgerMenu,
  );

  const handleOpenShopMenu = () => {
    dispatch(openComponent('isShopDropdown'));
    dispatch(closeComponent('isUserDropdown'));
    dispatch(closeComponent('isBurgerMenu'));
  };

  const handleOpenAuthMenu = () => {
    dispatch(openComponent('isUserDropdown'));
    dispatch(closeComponent('isShopDropdown'));
    dispatch(closeComponent('isBurgerMenu'));
  };

  const toggleBurgerMenu = () => {
    if (isBurgerMenuOpen) {
      dispatch(closeComponent('isBurgerMenu'));
    } else {
      dispatch(openComponent('isBurgerMenu'));
      dispatch(closeComponent('isUserDropdown'));
      dispatch(closeComponent('isShopDropdown'));
    }
  };

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
              onClick={toggleBurgerMenu}
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
              <div className={`${s.icon_shop} ${s.header_dropdown}`}>
                <button onClick={handleOpenShopMenu}>
                  <Icon icon='solar:shop-2-outline' />
                  <Icon icon='solar:alt-arrow-down-outline' />
                </button>
                {isShopDropdownOpen && <ShopDropdownMenu />}
              </div>

              <div className={`${s.icon_user} ${s.header_dropdown}`}>
                <button onClick={handleOpenAuthMenu}>
                  <Icon icon='solar:user-outline' />
                  <Icon icon='solar:alt-arrow-down-outline' />
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
