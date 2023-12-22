import {
  FormProvider,
  SubmitHandler,
  FieldValues,
  useForm,
} from 'react-hook-form';
import {
  changePhoneNumber,
  getUserInfo,
  changePassword,
} from '@/store/userProfile/userProfileThunks';
import { openModal } from '@/store/modalSlice';
import { useAppDispatch } from '@/hooks/reduxHook';
import { SettingsFormData, UserSettingsFormProps } from '@/types';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { UserDeliveryData } from './UserDeliveryData';
import { UserPassword } from './UserPassword';
import { UserPhoneNumber } from './UserPhoneNumber';
import s from './UserSettingsForm.module.scss';

export const UserSettingsForm = ({
  changeDataResult,
}: UserSettingsFormProps) => {
  const dispatch = useAppDispatch();

  const methods = useForm<SettingsFormData>({
    mode: 'onChange',
  });
  const { watch, reset } = methods;

  const newPassword = watch('new_password');
  const phoneNumber = watch('phone_number');

  const onSubmit = (data: SettingsFormData) => {
    if (phoneNumber) {
      dispatch(changePhoneNumber(data.phone_number)).then((response) => {
        if (response.payload) {
          changeDataResult(true);
          reset();
        } else {
          changeDataResult(false);
        }
        dispatch(openModal('settingsMessage'));
        dispatch(getUserInfo());
      });
    }

    if (newPassword) {
      dispatch(
        changePassword({
          currentPassword: data.current_password,
          newPassword: data.new_password,
        }),
      ).then((response) => {
        if (response.payload) {
          changeDataResult(true);
          reset();
        } else {
          changeDataResult(false);
        }
        dispatch(openModal('settingsMessage'));
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id='settings'
        className={s.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={s.form_wrap}>
          <p className={s.form_subtitle}>Зміна пароля</p>
          <UserPassword />
        </div>

        <div className={s.form_wrap}>
          <p className={s.form_subtitle}>Особисті дані</p>
          <UserPhoneNumber />
          <UserDeliveryData />
        </div>

        <ButtonUI
          type='submit'
          label='Зберегти'
          className={s.form_btn}
          onClick={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        />
      </form>
    </FormProvider>
  );
};
