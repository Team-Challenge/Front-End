import { useState } from 'react';
import { Icon } from '@iconify/react';
import s from './ProductSorting.module.scss';

const options = [
  { id: 'popular', label: 'за популярністю' },
  { id: 'date', label: 'за датою додавання' },
  { id: 'priceLowToHigh', label: 'від дешевих до дорогих' },
  { id: 'priceHighToLow', label: 'від дорогих до дешевих' },
];

export const ProductSorting = () => {
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
    <div className={s.sorting}>
      <div className={s.sort} onClick={toggleDropdown}>
        Сортувати:
        <p>{selectedOption}</p>
        <Icon icon='solar:alt-arrow-down-outline' />
      </div>

      {showDropdown && (
        <ul className={s.dropdown}>
          {options.map(({ id, label }) => (
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
