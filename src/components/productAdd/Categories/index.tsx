import { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { categoryList } from '@/constants/categoryList';
import s from './Categories.module.scss';

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const { setValue } = useFormContext();

  const foundCategory = categoryList.find(
    (category) => category.label === selectedCategory,
  );
  const hasSubcategories = foundCategory?.subcategories?.length! > 0;

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setValue('category', category);
  };

  const handleSubcategoryChange = (subcategory: string) => {
    setSelectedSubcategory(subcategory);
    setValue('subcategory', subcategory);
  };

  return (
    <div className={s.form_categories}>
      <div className={s.categories}>
        <p className='product-add_subtitle'>
          Оберіть категорію<span>*</span>
        </p>
        <ul className={s.list}>
          {categoryList.map(({ id, icon, label }) => (
            <li key={id} className={s.categories_item}>
              <input
                type='radio'
                name='category'
                id={label}
                className={s.input}
                checked={selectedCategory === label}
                onChange={() => handleCategoryChange(label)}
              />
              <label htmlFor={label} className={s.label}>
                <img src={icon} alt={label} />
                <p>{label}</p>
              </label>
            </li>
          ))}
        </ul>
      </div>

      {selectedCategory && hasSubcategories && (
        <div className={s.subcategories}>
          <p className='product-add_subtitle'>
            Оберіть підкатегорію<span>*</span>
          </p>
          <ul className={s.list}>
            {foundCategory?.subcategories?.map((subcategory) => (
              <li key={subcategory} className={s.subcategories_item}>
                <input
                  type='radio'
                  name='subcategory'
                  id={subcategory}
                  className={s.input}
                  checked={selectedSubcategory === subcategory}
                  onChange={() => handleSubcategoryChange(subcategory)}
                />
                <label htmlFor={subcategory} className={s.label}>
                  {subcategory}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
