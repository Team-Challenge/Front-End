import { useFormContext } from 'react-hook-form';
import { useCharCount } from '@/hooks/useCharCount';
import { TextInput, Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductName.module.scss';

export const ProductName = () => {
  const methods = useFormContext();
  const {
    formState: { errors },
  } = methods;

  const { charCount, handleInput } = useCharCount('', 100);

  const hasError = Boolean(errors.productName);

  return (
    <div className={s.name}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>
          Назва товару<span>*</span>
        </p>
        <Tooltip
          text='Чітка та точна назва без помилок – значно полегшить пошук для покупців'
          isBase={false}
          className={`product-add_tooltip ${s.name_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>

      <TextInput
        type='text'
        id='productName'
        placeholder='Наприклад: Сережки з дерева “Ластівки”'
        // value={productName}
        required
        maxLength={100}
        onClick={() => methods.clearErrors('productName')}
        onInput={(event) => handleInput(event)}
        // editModeIcon
        className={s.name_input}
        shouldApplyErrorStyles={false}
        shouldApplySuccessStyles={false}
      />

      {hasError ? (
        <p className='error-text'>Будь ласка, введіть назву свого товару</p>
      ) : (
        <p className={s.name_char_count}>
          {charCount}/{100} символів
        </p>
      )}
    </div>
  );
};
