import s from '../Settings.module.scss';
import { Icon } from '@iconify/react';
import { Modal } from '@/components/Modal';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { DeliverySelect } from './DeliverySelect';
import { OrnamentalTitle } from '@/components/OrnamentalTitle';
import { FormProvider, useForm } from 'react-hook-form';
import { DeliveryFormData } from '@/types';
import { UserPhoneNumber } from '../UserPhoneNumber';
import { FullName } from '@/components/FullName';
import { PhoneNumber } from '@/components/PhoneNumber';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { TextInput } from '@/components/UI/TextInput';
import { updateDelivetyInfo } from '@/store/userProfile/userProfileThunks';

export const UserDeliveryData = () => {
  const isModalOpen = useAppSelector((state) => state.modal.deliveryInfo);
  const dispatch = useAppDispatch();
  const userPhoneNumber = useAppSelector(
    (state) => state.userProfile.phone_number,
  );
  const fullName = useAppSelector((state) => state.userProfile.full_name);

  const methods = useForm<DeliveryFormData>({
    mode: 'onChange',
  });
  const { watch, reset } = methods;

  const onSubmit = (data: DeliveryFormData) => {
    console.log(data);
    if (!data) return null;

    dispatch(updateDelivetyInfo(data)).then(() => {
      // todo
      console.log('ur delivery info in Redux was changed');
    });
  };

  const hanldeOpenModal = () => {
    dispatch(openModal('deliveryInfo'));
  };

  return (
    <div className={s.form_wrap}>
      <p className={s.form_subtitle}>Дані про доставку</p>
      {true && (
        <>
          <p className={s.form_hints}>
            На жаль, у вас ще не додано жодної адреси доставки
          </p>
          <span className={s.addButton}>
            <Icon icon='solar:add-circle-outline' />
            <button onClick={hanldeOpenModal}>Додати</button>
          </span>
        </>
      )}
      {isModalOpen && (
        <Modal modalId='deliveryInfo' className={s.modal}>
          <OrnamentalTitle tag='h4' text='Введіть адресу' />
          <FormProvider {...methods}>
            <form
              id='delivery'
              className={`${s.form} ${s.modal_form}`}
              onSubmit={(e) => e.preventDefault()}
            >
              <div className={s.form_wrap}>
                <p className={s.form_hints}>Ім’я та Прізвище одержувача</p>
                <FullName value={fullName as string} />
                <p className={s.form_hints}>
                  {userPhoneNumber
                    ? 'Змінити номер телефону'
                    : 'Додати номер телефону'}
                </p>
                <PhoneNumber userPhoneNumber={userPhoneNumber} />
                <DeliverySelect />
                <p className={s.form_hints}>Спосіб доставки</p>
                {/* todo Change inputs below into dropdown selects */}
                <TextInput
                  id='post_service'
                  type='text'
                  placeholder='placeholder'
                />
                <p className={s.form_hints}>Місто</p>
                <TextInput
                  id='city_name'
                  type='text'
                  placeholder='placeholder'
                />
                <p className={s.form_hints}>Відділення</p>
                <TextInput
                  id='branch_name'
                  type='text'
                  placeholder='placeholder'
                />
              </div>
              <ButtonUI
                type='submit'
                label='Зберегти'
                onClick={methods.handleSubmit(onSubmit)}
              />
            </form>
          </FormProvider>
        </Modal>
      )}
    </div>
  );
};
