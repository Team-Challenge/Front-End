import { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { colorsList } from '@/constants/colorsList';
import { Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './Colors.module.scss';

export const Colors = () => {
  const { setValue } = useFormContext();
  const { width } = useWindowDimensions();
  const [selectedColors, setSelectedColors] = useState<string[]>([]);
  const [showAllColors, setShowAllColors] = useState<boolean>(false);

  const isMobileScreen = width <= 582;
  const displayedColors =
    showAllColors || !isMobileScreen ? colorsList : colorsList.slice(0, 8);

  const toggleShowAllColors = () => {
    setShowAllColors(!showAllColors);
  };

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
    <div className={s.colors}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Кольори</p>
        <Tooltip
          text='Додайте як умога більше характеристик вашого виробу, такі як: основні кольори, розміри та матеріали. Це допоможе майбутнім покупцям знайти його ще простіше.'
          className={`product-add_tooltip ${s.colors_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>
      <p className='product-add_hint'>Оберіть до 3-ох відтінків</p>
      <ul className={s.colors_list}>
        {displayedColors.map(({ id, name, styleClass }) => (
          <li
            key={id}
            className={`${s.colors_item} ${
              isCheckboxInactive(name) ? s.colors_inactive : ''
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
      {isMobileScreen && (
        <button onClick={toggleShowAllColors} className={s.colors_button}>
          {showAllColors ? (
            <>
              Сховати всі
              <Icon icon='iconamoon:sign-minus-light' />
            </>
          ) : (
            <>
              Показати всі
              <Icon icon='iconamoon:sign-plus' />
            </>
          )}
        </button>
      )}
    </div>
  );
};
