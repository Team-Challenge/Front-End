import { closeComponent, openComponent } from '@/store/overlayStateSlice';
import { useAppDispatch, useAppSelector } from './reduxHook';

export const useToggleMenu = (menuType: string) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.overlayState[menuType]);

  const toggleMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();

    if (isOpen) {
      dispatch(closeComponent(menuType));
    } else {
      dispatch(openComponent(menuType));

      ['isUserDropdown', 'isShopDropdown', 'isBurgerMenu']
        .filter((item) => item !== menuType)
        .forEach((type) => dispatch(closeComponent(type)));
    }
  };

  return [isOpen, toggleMenu] as const;
};
