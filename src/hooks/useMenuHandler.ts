import { useState } from 'react';

export const useMenuHandler = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return [isOpen, openMenu, closeMenu, toggleMenu] as const;
};