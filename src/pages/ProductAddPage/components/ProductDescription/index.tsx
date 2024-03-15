import { TextArea, Tooltip } from '@/components/UI';
import { productAddTips } from '@/constants/productAddTips';
import { Icon } from '@iconify/react';
import s from './ProductDescription.module.scss';

export const ProductDescription = () => {
  return (
    <div className={s.description}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Опис товару</p>
        <Tooltip
          text={productAddTips.description}
          isBase={false}
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
        shouldApplyErrorStyles={false}
        shouldApplySuccessStyles={false}
      />
    </div>
  );
};
