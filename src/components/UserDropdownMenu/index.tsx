import { useAppSelector } from '@/hooks/reduxHook';
import { UserDropdownMenuProps } from '@/types';
import { ButtonUI } from '../UI/ButtonUI';
import s from './UserDropdownMenu.module.scss';

export const UserDropdownMenu = ({ handleOpenModal }: UserDropdownMenuProps) => {
  const { isAuth } = useAppSelector((state) => state.auth);

  return (
    <div className={s.dropdownMenu}>
      {isAuth ? (
        <p>Menu</p>
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
