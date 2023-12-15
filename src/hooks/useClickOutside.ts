import { RefObject, useEffect } from "react";

export const useClickOutside = <T extends HTMLElement>(ref: RefObject<T>, callback: () => void): void => {
  const handleClick = (event: MouseEvent) => {
    if (ref.current && !ref.current.contains(event.target as Node)) {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);
};