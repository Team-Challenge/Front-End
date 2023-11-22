import { useState } from 'react';
import { FavoriteIcon } from '../icons/FavoriteIcon';
import { CartIcon } from '../icons/CartIcon';
import s from './Header.module.scss';
import { SignIn } from '../auth/SignIn';
import { SignUp } from '../auth/SignUp';
import { Modal } from '../Modal';
import { openModal } from '@/store/modalSlice';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { UserIcon } from '../icons/UserIcon';
import { Link } from 'react-router-dom';

export const Header = () => {
  const [isSignIn, setIsSignIn] = useState<boolean>(true);
  const { isAuth } = useAppSelector((state) => state.auth);
  const isModalOpen = useAppSelector((state) => state.modal.auth);
  const dispatch = useAppDispatch();

  const handleOpenModal = () => {
    dispatch(openModal('auth'));
  };

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
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
          {!isAuth ? (
            <button onClick={handleOpenModal}>Увійти</button>
          ) : (
            <Link to='/userpanel'>
              <UserIcon />
            </Link>
          )}

          <button>
            <FavoriteIcon />
          </button>
          <button>
            <CartIcon />
          </button>
        </div>
      </div>
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
