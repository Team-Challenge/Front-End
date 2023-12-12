import { useState } from 'react';
import { Link } from 'react-router-dom';
import { closeModal, openModal } from '@/store/modalSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { categoryList } from '@/constants/categoryList';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { Modal } from '../Modal';
import LogoImg from '../../assets/logo.svg';
import { Icon } from '@iconify/react';
import s from './Header.module.scss';

export const Header = () => {
  const dispatch = useAppDispatch();
  const isLoginModalOpen = useAppSelector((state) => state.modal.login);
  const isRegistrationModalOpen = useAppSelector(
    (state) => state.modal.registration,
  );
  const isBurgerMenuOpen = useAppSelector((state) => state.modal.burgerMenu);
  const { width } = useWindowDimensions();
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);

  const handleOpenModal = (id: string) => {
    dispatch(openModal(id));
    setIsDropdownMenuOpen(false);
  };

  const handleOpenAuthMenu = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  };

  const toggleBurgerMenu = () => {
    if (isBurgerMenuOpen) {
      dispatch(closeModal('burgerMenu'));
    } else {
      dispatch(openModal('burgerMenu'));
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
            <button onClick={toggleBurgerMenu}>
              <Icon icon='solar:hamburger-menu-outline' />
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
              <div className={s.icon_shop}>
                <button>
                  <Icon icon='solar:shop-2-outline' />
                  <Icon icon='solar:alt-arrow-down-outline' />
                </button>
              </div>

              <div className={`${s.icon_user} ${s.header_dropdown}`}>
                <button onClick={handleOpenAuthMenu}>
                  <Icon icon='solar:user-outline' />
                  <Icon icon='solar:alt-arrow-down-outline' />
                </button>
                {isDropdownMenuOpen && (
                  <UserDropdownMenu
                    handleOpenModal={handleOpenModal}
                    setDropdownOpen={setIsDropdownMenuOpen}
                  />
                )}
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
        <Modal modalId='login'>
          <SignIn />
        </Modal>
      )}
      {isRegistrationModalOpen && (
        <Modal modalId='registration'>
          <SignUp />
        </Modal>
      )}
    </header>
  );
};
