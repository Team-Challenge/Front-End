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
  changeUserDeliveryInfo,
} from '@/store/userProfile/userProfileThunks';
import { openModal } from '@/store/modalSlice';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
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
  const userContact = useAppSelector((state) => state.userProfile.phone_number);
  const cityName = useAppSelector((state) => state.userProfile.city);

  const methods = useForm<SettingsFormData>({
    mode: 'onChange',
  });

  const {
    watch,
    formState: { isValid },
  } = methods;

  const newPassword = watch('new_password');
  const phoneNumber = watch('phone_number');
  const city = watch('city');
  const postService = watch('post');
  const address = watch('branches');

  const onSubmit = async (data: SettingsFormData) => {
    if (newPassword) {
      const response = await dispatch(
        changePassword({
          currentPassword: data.current_password,
          newPassword: data.new_password,
        }),
      );
      handleResponse(response);
    }

    if (userContact !== phoneNumber) {
      const response = await dispatch(changePhoneNumber(data.phone_number));
      handleResponse(response);
    }

    if (cityName !== city && city && postService && address) {
      const [branch_name, address] =
        (data.branches && data.branches.split(', ')) || [];

      const response = await dispatch(
        changeUserDeliveryInfo({
          city: data.city,
          post: data.post,
          address,
          branch_name,
        }),
      );

      handleResponse(response);
    }
  };

  const handleResponse = (response: any) => {
    if (response.payload) {
      changeDataResult(true);
    } else {
      changeDataResult(false);
    }
    dispatch(openModal('settingsMessage'));
    dispatch(getUserInfo());
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
          disabled={!isValid}
          className={s.form_btn}
          onClick={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
        />
      </form>
    </FormProvider>
  );
};
