import { NavLink } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHook';
import { UserDropdownMenuProps } from '@/types';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';
import { ButtonUI } from '../UI/ButtonUI';
import s from './UserDropdownMenu.module.scss';

export const UserDropdownMenu = ({
  handleOpenModal,
}: UserDropdownMenuProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div className={s.dropdownMenu}>
      {isAuth ? (
        <div>menu</div>
      ) : (
        <>
          <ButtonUI label='Увійти' onClick={() => handleOpenModal('login')} />
          <div className={s.dropdownMenu_registration}>
            <p>Вперше тут?</p>
            <button onClick={() => handleOpenModal('registration')}>
              Зареєструватися
            </button>
          </div>
        </>
      )}
    </div>
  );
};
