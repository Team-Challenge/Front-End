import { TextArea, Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductDescription.module.scss';

export const ProductDescription = () => {
  return (
    <div className={s.description}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Опис товару</p>
        <Tooltip
          text='Не знаєте що написати?
          Почніть з опису вигляду самого виробу, з яких матеріалів виготовлений, 
          опишіть процес створення, щоб підкреслити його характер та індивідуальність'
          className={`product-add_tooltip ${s.description_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>
      <TextArea
        name='description'
        id='description'
        placeholder='Приклад: Реконструкція старовинної карпатської силянки, виготовлена з червоного чеського бісеру...'
        rows={11}
        maxLength={1000}
        minLength={1}
      />
    </div>
  );
};
