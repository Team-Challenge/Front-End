import { useState } from 'react';
import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from 'react-hook-form';
import {
  transformInstagramLinkToNickname,
  transformNicknameToInstagramLink,
} from '@/utils/transformInstagramLink';
import {
  changeStoreInfo,
  getStoreInfo,
} from '@/store/storeProfile/storeProfileThunks';
import { openModal } from '@/store/modalSlice';
import { StoreSettingsFormProps } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { ButtonUI } from '@/components/UI';
import { DataChangeNotificationModal } from '@/components/DataChangeNotificationModal';
import { StoreName } from './StoreName';
import { StorePhoneNumber } from './StorePhoneNumber';
import { StoreSocialMediaLink } from './StoreSocialMediaLink';
import { StoreDescription } from './StoreDescription';
import s from './StoreSettings.module.scss';

export const StoreSettings = () => {
  const [isSuccessfulChange, setIsSuccessfulChange] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const isModalOpen = useAppSelector(
    (state) => state.modal.dataStoreChangeNotification,
  );

  const storeNameDefault = useAppSelector((state) => state.storeProfile.name);
  const storePhoneNumberDefault = useAppSelector(
    (state) => state.storeProfile.phone_number,
  );
  const storeDescriptionDefault = useAppSelector(
    (state) => state.storeProfile.description,
  );
  const storeLinkDefault = useAppSelector((state) => state.storeProfile.link);

  const instagramLink =
    storeLinkDefault && transformInstagramLinkToNickname(storeLinkDefault);

  const methods = useForm<StoreSettingsFormProps>({
    mode: 'onChange',
  });

  const {
    watch,
    setError,
    formState: { isValid },
  } = methods;

  const [storeName, storePhoneNumber, storeLink, storeDesc] = watch([
    'name',
    'phone_number',
    'link',
    'description',
  ]);

  const handleResponse = (response: any) => {
    if (response.payload) {
      setIsSuccessfulChange(true);
    } else {
      setIsSuccessfulChange(false);
    }
    dispatch(openModal('dataStoreChangeNotification'));
    dispatch(getStoreInfo());
  };

  const onSubmit = async (data: StoreSettingsFormProps) => {
    if (storeNameDefault !== storeName) {
      try {
        await dispatch(
          changeStoreInfo({
            name: data.name,
          }),
        ).unwrap();

        setIsSuccessfulChange(true);
        dispatch(openModal('dataStoreChangeNotification'));
        dispatch(getStoreInfo());
      } catch (error: unknown) {
        if ((error as { code: string }).code === 'ERR_BAD_REQUEST') {
          setError('name', {
            type: 'manual',
            message:
              'На жаль, вже існує магазин з такою назвою. Будь ласка, введіть іншу назву, яка буде унікальною',
          });
          return;
        }
      }
    }

    if (storePhoneNumberDefault !== storePhoneNumber) {
      const response = await dispatch(
        changeStoreInfo({
          phone_number: data.phone_number,
        }),
      );

      handleResponse(response);
    }

    if (instagramLink !== storeLink && storeLink) {
      const instagramLink = transformNicknameToInstagramLink(data.link);

      const response = await dispatch(
        changeStoreInfo({
          link: instagramLink,
        }),
      );

      handleResponse(response);
    }

    if (storeDescriptionDefault !== storeDesc && storeDesc) {
      const response = await dispatch(
        changeStoreInfo({
          description: data.description,
        }),
      );

      handleResponse(response);
    }
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
