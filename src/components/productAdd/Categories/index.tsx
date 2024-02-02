import { useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { categoryList } from '@/constants/categoryList';
import s from './Categories.module.scss';

export const Categories = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [selectedSubcategory, setSelectedSubcategory] = useState<string>('');

  const {
    setValue,
    control,
    clearErrors,
    formState: { errors },
  } = useFormContext();

  const foundCategory = categoryList.find(
    (category) => category.label === selectedCategory,
  );
  const hasSubcategories = foundCategory?.subcategories?.length! > 0;

  return (
    <div className={s.categorization}>
      <div className={s.categories}>
        <p className='product-add_subtitle'>
          Оберіть категорію<span>*</span>
        </p>
        <ul className={s.list}>
          {categoryList.map(({ id, icon, label }) => (
            <li key={id} className={s.categories_item}>
              <Controller
                name='category'
                control={control}
                rules={{
                  required:
                    'Будь ласка, оберіть категорія та підкатегію відповідно вашому товару.',
                }}
                render={({ field }) => (
                  <input
                    {...field}
                    type='radio'
                    name='category'
                    id={label}
                    value={label}
                    className={s.input}
                    checked={selectedCategory === label}
                    onChange={() => {
                      setSelectedCategory(label);
                      setValue('category', label);
                      setValue('subcategory', '');
                    }}
                  />
                )}
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
                <Controller
                  name='subcategory'
                  control={control}
                  rules={{
                    required:
                      selectedCategory !== 'Набори'
                        ? 'Будь ласка, оберіть підкатегорію відповідно вашому товару.'
                        : false,
                  }}
                  defaultValue={null}
                  render={({ field }) => (
                    <input
                      {...field}
                      type='radio'
                      name='subcategory'
                      id={subcategory}
                      value={subcategory}
                      className={s.input}
                      checked={selectedSubcategory === subcategory}
                      onChange={() => {
                        setSelectedSubcategory(subcategory);
                        setValue('subcategory', subcategory);
                        clearErrors('category');
                        clearErrors('subcategory');
                      }}
                    />
                  )}
                />
                <label htmlFor={subcategory} className={s.label}>
                  {subcategory}
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {errors.category && (
        <p className='error-text'>{errors.category.message as string}</p>
      )}

      {errors.subcategory && !errors.category && (
        <p className='error-text'>{errors.subcategory.message as string}</p>
      )}
    </div>
  );
};
