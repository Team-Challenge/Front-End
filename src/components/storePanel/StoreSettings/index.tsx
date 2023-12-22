import { useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from 'react-hook-form';
import { useAppSelector } from '@/hooks/reduxHook';
import { ButtonUI } from '@/components/UI';
import { DataChangeNotificationModal } from '@/components/DataChangeNotificationModal';
import { StoreName } from './StoreName';
import { StorePhoneNumber } from './StorePhoneNumber';
import { StoreSocialMediaLink } from './StoreSocialMediaLink';
import { StoreDescription } from './StoreDescription';
import s from './StoreSettings.module.scss';

export const StoreSettings = () => {
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const isModalOpen = useAppSelector(
    (state) => state.modal.dataStoreChangeNotification,
  );

  const methods = useForm({
    mode: 'onChange',
  });

  const {
    formState: { isValid },
  } = methods;

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          id='store'
          className={s.form}
          onSubmit={(e) => e.preventDefault()}
        >
          <StoreName />
          <StorePhoneNumber />
          <StoreSocialMediaLink />
          <StoreDescription />

          <ButtonUI
            label='Зберегти'
            className={s.form_button}
            disabled={!isValid}
            onClick={methods.handleSubmit(
              onSubmit as SubmitHandler<FieldValues>,
            )}
          />
        </form>
      </FormProvider>

      {isModalOpen && (
        <DataChangeNotificationModal
          isSuccessfulChange={isSuccessfulChange}
          modalId='dataStoreChangeNotification'
        />
      )}
    </>
  );
};
