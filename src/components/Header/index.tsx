import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { openModal } from '@/store/modalSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { UserDropdownMenu } from '../UserDropdownMenu';
import { Modal } from '../Modal';
import s from './Header.module.scss';

export const Header = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const [isDropdownMenuOpen, setIsDropdownMenuOpen] = useState<boolean>(false);
  const isModalOpen = useAppSelector((state) => state.modal.auth);
  const dispatch = useAppDispatch();

  const handleOpenModal = (isLogin: boolean) => {
    dispatch(openModal('auth'));
    setIsDropdownMenuOpen(false);
    setIsSignIn(isLogin);
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  const handleOpenAuthMenu = () => {
    setIsDropdownMenuOpen(!isDropdownMenuOpen);
  };

  return (
    <header className={s.header}>
      <div className={`container ${s.header_container}`}>
        <Link to='/' className={s.header_logo}>
          Logo
        </Link>
        <ul className={s.header_categories}>
          <li>на голову</li>
          <li>на вуха</li>
          <li>на шию</li>
        </ul>
        <div className={s.header_buttons}>
          <button onClick={handleOpenAuthMenu}>
            <Icon icon='solar:user-outline' />
            <Icon icon='solar:alt-arrow-down-outline' />
          </button>

          <button>
            <Icon icon='solar:heart-outline' />
          </button>
          <button>
            <Icon icon='solar:bag-5-outline' />
          </button>
        </div>
      </div>

      {isDropdownMenuOpen && (
        <UserDropdownMenu handleOpenModal={handleOpenModal} />
      )}

      {isModalOpen && (
        <Modal modalId='auth'>
          {isSignIn ? (
            <SignIn toggleForm={toggleForm} />
          ) : (
            <SignUp toggleForm={toggleForm} />
          )}
        </Modal>
      )}
    </header>
  );
};
