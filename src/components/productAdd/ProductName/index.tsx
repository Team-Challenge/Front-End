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
  const { charCount, handleInput } = useCharCount('', 30);

  const hasError = Boolean(errors.name);

  return (
    <div className={`${s.form_wrap} ${s.name}`}>
      <div className='product-add_subtitle_wrap'>
        <p className='product-add_subtitle'>
          Назва товару<span>*</span>
        </p>
        <Tooltip
          text='Чітка та точна назва без помилок – значно полегшить пошук для покупців'
          className={`product-add_tooltip ${s.name_tooltip}`}
        >
          <Icon icon='heroicons:light-bulb' />
        </Tooltip>
      </div>
      <TextInput
        type='text'
        id='name'
        placeholder='Наприклад: Сережки з дерева “Ластівки”'
        // value={productName}
        required
        errorMessage={`Будь ласка, введіть назву свого товару`}
        maxLength={100}
        onClick={() => methods.clearErrors('name')}
        onInput={(event) => handleInput(event)}
        editModeIcon
      />

      {hasError ? (
        <p className={`error-text ${s.form_error}`}>
          {errors?.name?.message as string}
        </p>
      ) : (
        <p className={s.name_char_count}>
          {charCount}/{100} символів
        </p>
      )}
    </div>
  );
};
