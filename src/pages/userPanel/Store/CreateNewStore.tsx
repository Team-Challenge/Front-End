import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from 'react-hook-form';
import { useAppDispatch } from '@/hooks/reduxHook';
import {
  changeStoreInfo,
  getStoreInfo,
} from '@/store/storeProfile/storeProfileThunks';
import { openModal, closeModal } from '@/store/modalSlice';
import { CreateNewStoreFormData } from '@/types';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { PhoneNumber } from '@/components/PhoneNumber';
import { TextInput } from '@/components/UI/TextInput';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { Icon } from '@iconify/react';
import s from './Store.module.scss';

export const CreateNewStore = () => {
  const dispatch = useAppDispatch();

  const methods = useForm({
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = async (data: CreateNewStoreFormData) => {
    try {
      await dispatch(
        changeStoreInfo({
          name: data.name,
          phone_number: data.phoneNumber,
        }),
      );

      dispatch(getStoreInfo());
      dispatch(closeModal('createNewStore'));
      dispatch(openModal('successfulCreateStore'));
    } catch (error) {
      console.error('Error create store:', error);
    }
  };

  return (
    <>
      <OrnamentalTitle tag='h4' text='Створіть свій магазин' />
      <p className={s.modal_subtitle}>
        Введіть номер телефону, який буде відображатися для покупців та
        придумайте унікальну назву для вашого магазину
      </p>
      <FormProvider {...methods}>
        <form
          id='newStore'
          className={s.modal_form}
          onSubmit={(e) => e.preventDefault()}
        >
          <PhoneNumber />
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
              унікального стилю. Просто дайте волю вашій фантазії! Не
              хвилюйтеся, ви завжди зможете змінити її пізніше
            </p>
          </div>
          <ButtonUI
            label='Почати продавати'
            className={s.modal_btn}
            disabled={!isValid}
            onClick={methods.handleSubmit(
              onSubmit as SubmitHandler<FieldValues>,
            )}
          />
        </form>
      </FormProvider>
    </>
  );
};
