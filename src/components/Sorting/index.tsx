import { KeyboardEvent, useState } from 'react';
import { sortingOptions } from '@/constants/sortingOptions';
import { Icon } from '@iconify/react';
import s from './Sorting.module.scss';

export const Sorting = ({ className }: { className?: string }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedOption, setSelectedOption] = useState('за популярністю');

  const handleSortingChange = (option: string) => {
    setSelectedOption(option);
    setShowDropdown(false);
  };

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      toggleDropdown();
    }
  };

  const handleDropdownItemClick = (
    event: KeyboardEvent<HTMLLIElement>,
    label: string,
  ) => {
    if (event.key === 'Enter') {
      handleSortingChange(label);
      toggleDropdown();
    }
  };

  return (
    <div className={`${s.sorting} ${className}`}>
      <div
        className={s.sort}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        role='button'
        tabIndex={0}
      >
        Сортувати:
        <p>{selectedOption}</p>
        <Icon icon='solar:alt-arrow-down-outline' />
      </div>

      {showDropdown && (
        <ul className={s.dropdown}>
          {sortingOptions.map(({ id, label }) => (
            <li
              key={id}
              className={selectedOption === label ? s.selected : ''}
              onClick={() => handleSortingChange(label)}
              onKeyDown={(e) => handleDropdownItemClick(e, label)}
              tabIndex={0}
              role='menuitem'
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
