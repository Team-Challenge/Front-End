import { Controller, useFormContext } from 'react-hook-form';
import { materialsList } from '@/constants/materialsList';
import { createOptionsList } from '@/utils/createOptionsList';
import { SelectInput } from '@/components/UI';
import s from './Materials.module.scss';

export const Materials = () => {
  const methods = useFormContext();
  const { control } = methods;

  const metalsList = createOptionsList('metals', materialsList);
  const coatingList = createOptionsList('coating', materialsList);
  const decorativeElementsList = createOptionsList(
    'decorativeElements',
    materialsList,
  );
  const stonesList = createOptionsList('stones', materialsList);
  const textilesList = createOptionsList('textiles', materialsList);
  const otherList = createOptionsList('other', materialsList);

  return (
    <div className={s.materials}>
      <p className='product-add_subtitle'>Матеріали</p>
      <p className='product-add_hint'>
        Ви можете обрати до 5-ти варіантів в кожному розділі
      </p>

      <div className={s.materials_list}>
        <div className={s.materials_wrap}>
          <p>Метали</p>
          <Controller
            name='metals'
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={metalsList}
                placeholder='Почніть вводити або оберіть зі списку'
                isSearchable
                mode='multiple'
                maxCount={5}
              />
            )}
          />
        </div>

        <div className={s.materials_wrap}>
          <p>Покриття</p>
          <Controller
            name='coating'
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={coatingList}
                placeholder='Почніть вводити або оберіть зі списку'
                isSearchable
                mode='multiple'
                maxCount={5}
              />
            )}
          />
        </div>

        <div className={s.materials_wrap}>
          <p>Декоративні елементи</p>
          <Controller
            name='decorativeElements'
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={decorativeElementsList}
                placeholder='Почніть вводити або оберіть зі списку'
                isSearchable
                mode='multiple'
                maxCount={5}
              />
            )}
          />
        </div>

        <div className={s.materials_wrap}>
          <p>Камені</p>
          <Controller
            name='stones'
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={stonesList}
                placeholder='Почніть вводити або оберіть зі списку'
                isSearchable
                mode='multiple'
                maxCount={5}
              />
            )}
          />
        </div>

        <div className={s.materials_wrap}>
          <p>Текстиль</p>
          <Controller
            name='textiles'
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={textilesList}
                placeholder='Почніть вводити або оберіть зі списку'
                isSearchable
                mode='multiple'
                maxCount={5}
              />
            )}
          />
        </div>

        <div className={s.materials_wrap}>
          <p>Інше</p>
          <Controller
            name='other'
            control={control}
            render={({ field }) => (
              <SelectInput
                field={field}
                options={otherList}
                placeholder='Почніть вводити або оберіть зі списку'
                isSearchable
                mode='multiple'
                maxCount={5}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
