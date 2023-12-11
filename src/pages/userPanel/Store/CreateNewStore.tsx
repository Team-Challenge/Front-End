import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from 'react-hook-form';
import { CreateNewStoreProps } from '@/types';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { TextInput } from '@/components/UI/TextInput';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './Store.module.scss';

export const CreateNewStore = ({ onSubmit }: CreateNewStoreProps) => {
  const methods = useForm({
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  return (
    <>
      <OrnamentalTitle tag='h4' text='Назвіть свій магазин' />
      <p className={s.modal_subtitle}>
        Оберіть унікальну назву для вашого магазину. Не хвилюйтеся, ви завжди
        зможете змінити її пізніше
      </p>
      <FormProvider {...methods}>
        <form
          id='newStore'
          className={s.modal_form}
          onSubmit={methods.handleSubmit(
            onSubmit as SubmitHandler<FieldValues>,
          )}
        >
          <TextInput
            type='text'
            id='name'
            placeholder='Назва магазину'
            required
            errorMessage={`Будь ласка, введіть назву магазину`}
            maxLength={30}
            maxLengthMessage={`Будь ласка, введіть назву магазину, що не перевищує 30 символів`}
            className={s.modal_input}
          />
          <div className={s.modal_hint}>
            <i>
              <Icon icon='solar:info-circle-outline' />
            </i>
            <p>
              Часто назву можна обрати на основі того, що ви продаєте, вашого
              унікального стилю. Просто дайте волю вашій фантазії!
            </p>
          </div>
          <ButtonUI
            label='Почати продавати'
            className={s.modal_btn}
            disabled={!isValid}
          />
        </form>
      </FormProvider>
    </>
  );
};
