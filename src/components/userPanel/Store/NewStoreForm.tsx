import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { TextInput } from '@/components/UI/TextInput';
import s from './Store.module.scss';

interface NewStoreFormData {
  store_name: string;
}

export const NewStoreForm = () => {
  const methods = useForm({
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = (data: NewStoreFormData) => {
    console.log(data);
  };

  return (
    <FormProvider {...methods}>
      <form
        id='registration'
        className={s.form}
        onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <label className={s.form_label}>
          Назва магазину *
          <TextInput
            type='text'
            id='store_name'
            placeholder='Петрович'
            required
            regex={
              /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){3,5}[.]{0,1}$/
            }
            errorMessage='Будь ласка, введіть назву свого магазину'
          />
        </label>
        <button type='submit' disabled={!isValid} className={s.form_btn}>
          Зареєструватися
        </button>
      </form>
    </FormProvider>
  );
};
