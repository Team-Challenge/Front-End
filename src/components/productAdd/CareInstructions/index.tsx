import { TextArea, Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './CareInstructions.module.scss';

export const CareInstructions = () => {
  return (
    <div className={s.instructions}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>Інструкція по догляду</p>
        <Tooltip
          text='Додайте поради, які допоможуть правильно доглядати за вашими прикрасами. Розкажіть, як уникнути подряпин, як правильно чистити та зберігати, щоб забезпечити тривалий та бездоганний вигляд.'
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
      />
    </div>
  );
};
