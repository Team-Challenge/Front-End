import { useAppDispatch, useAppSelector } from './reduxHook';
import { closeComponent, openComponent } from '@/store/overlayStateSlice';

export const useToggleMenu = (menuType: string) => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector(
    (state) => state.overlayState[menuType],
  );

  const toggleMenu = () => {
    if (isOpen) {
      dispatch(closeComponent(menuType));
    } else {
      dispatch(openComponent(menuType));

      ['isUserDropdown', 'isShopDropdown', 'isBurgerMenu']
        .filter(item => item !== menuType)
        .forEach(type => dispatch(closeComponent(type)));
    }
  };

  return [ isOpen, toggleMenu ] as const;
};