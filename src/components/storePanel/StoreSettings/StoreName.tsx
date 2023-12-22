import { useFormContext } from 'react-hook-form';
import { useAppSelector } from '@/hooks/reduxHook';
import { useCharCount } from '@/hooks/useCharCount';
import { TextInput } from '@/components/UI';
import s from './StoreSettings.module.scss';

export const StoreName = () => {
  const methods = useFormContext();
  const {
    formState: { errors },
  } = methods;

  const storeName = useAppSelector((state) => state.storeProfile.name);

  const { charCount, handleInput } = useCharCount(storeName, 30);

  const hasError = Boolean(errors.changeStoreName);

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>
        Назва магазину<span>*</span>
      </p>
      <TextInput
        type='text'
        id='name'
        placeholder='Назва магазину'
        value={storeName}
        required
        errorMessage={`Будь ласка, введіть назву магазину`}
        maxLength={30}
        isServerValidation={hasError}
        isServerError={hasError}
        onClick={() => methods.clearErrors('changeStoreName')}
        onInput={(event) => handleInput(event)}
        editModeIcon
      />

      {hasError ? (
        <p className={`error-text ${s.form_error}`}>
          {errors?.changeStoreName?.message as string}
        </p>
      ) : (
        <p className={s.form_char_count}>
          {charCount}/{30} символів
        </p>
      )}
    </div>
  );
};
