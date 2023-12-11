import { useAppSelector } from '@/hooks/reduxHook';
import { UserDropdownMenuProps } from '@/types';
import { ButtonUI } from '../UI/ButtonUI';
import s from './UserDropdownMenu.module.scss';
import { userPanelButtonsList } from '@/constants/userPanelButtonsList';
import { NavLink } from 'react-router-dom';

export const UserDropdownMenu = ({ handleOpenModal }: UserDropdownMenuProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div className={s.dropdownMenu}>
      {isAuth ? (
        <div>
          menu
        </div>
      ) : (
        <>
          <ButtonUI
            label='Увійти'
            onClick={() => handleOpenModal(true)}
          />
          <div className={s.dropdownMenu_registration}>
            <p>Вперше тут?</p>
            <button onClick={() => handleOpenModal(false)}>
              Зареєструватися
            </button>
          </div>
        </>
      )}
    </div>
  );
};
