import { useState } from 'react';
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

  return (
    <div className={`${s.sorting} ${className}`}>
      <div className={s.sort} onClick={toggleDropdown}>
        Сортувати:
        <p>{selectedOption}</p>
        <Icon icon='solar:alt-arrow-down-outline' />
      </div>

      {showDropdown && (
        <ul className={s.dropdown}>
          {sortingOptions.map(({ id, label }) => (
            <li
              key={id}
              onClick={() => handleSortingChange(label)}
              className={selectedOption === label ? s.selected : ''}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
