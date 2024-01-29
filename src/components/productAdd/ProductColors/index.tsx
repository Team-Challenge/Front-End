import { useEffect, useState } from 'react';
import s from './ProductColors.module.scss';
import { colorsList } from '@/constants/colorsList';
import { Controller, useFormContext } from 'react-hook-form';
import { Icon } from '@iconify/react';
import { Tooltip } from '@/components/UI';

export const ProductColors = () => {
  const { setValue } = useFormContext();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);

  const handleCheckboxChange = (color: string) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else if (selectedColors.length < 3) {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const isCheckboxInactive = (color: string) => {
    return !selectedColors.includes(color) && selectedColors.length === 3;
  };

  useEffect(() => {
    setValue('colors', selectedColors);
  }, [selectedColors]);

  return (
    <div>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Кольори</p>
        <Tooltip
          text='Використовуйте природне світло та уникайте спалаху. Під час фотографування акцентуйте увагу на тому, як виглядають прикраси під час носіння. Оберіть світлий та нейтральний фон для кращого візуального враження. Збільште кількість деталей та варіюйте кути зйомки, щоб забезпечити повноцінний огляд прикрас.'
          className={`product-add_tooltip ${s.color_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>
      <p className='product-add_hint'>Оберіть до 3-ох відтінків</p>
      <ul className={s.color_list}>
        {colorsList.map(({ id, name, styleClass }) => (
          <li
            key={id}
            className={`${s.color_item} ${
              isCheckboxInactive(name) ? s.color_inactive : s.active
            }`}
          >
            <input
              type='checkbox'
              name={name}
              id={name}
              checked={selectedColors.includes(name)}
              onChange={() => handleCheckboxChange(name)}
            />
            <label htmlFor={name}>
              <div className={styleClass}></div>
              <p>{name}</p>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};
