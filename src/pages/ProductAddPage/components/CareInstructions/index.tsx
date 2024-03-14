import { TextArea, Tooltip } from '@/components/UI';
import { productAddTips } from '@/constants/productAddTips';
import { Icon } from '@iconify/react';
import s from './CareInstructions.module.scss';

export const CareInstructions = () => {
  return (
    <div className={s.instructions}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Інструкція по догляду</p>
        <Tooltip
          text={productAddTips.careInstructions}
          isBase={false}
          className={`product-add_tooltip ${s.instructions_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>
      <TextArea
        name='careInstructions'
        id='careInstructions'
        placeholder='Приклад: Реконструкція старовинної карпатської силянки, виготовлена з червоного чеського бісеру... '
        rows={11}
        maxLength={1000}
        minLength={1}
        className={s.form_textarea}
        shouldApplyErrorStyles={false}
        shouldApplySuccessStyles={false}
      />
    </div>
  );
};
