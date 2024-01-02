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
  const userPhoneNumberDefault = useAppSelector(
    (state) => state.userProfile.phone_number,
  );
  const userDeliveryBranchDefault = useAppSelector(
    (state) => state.userProfile.branch_name,
  );

  const methods = useForm<SettingsFormData>({
    mode: 'onChange',
  });

  const {
    watch,
    formState: { isValid },
  } = methods;

  const [newPassword, userPhoneNumber, city, postService, address] = watch([
    'new_password',
    'phone_number',
    'city',
    'post',
    'branches',
  ]);

  const isChangeDeliveryData =
    userDeliveryBranchDefault !== address?.split(', ')[0] &&
    city &&
    postService &&
    address;

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

    if (userPhoneNumberDefault !== userPhoneNumber && userPhoneNumber) {
      const response = await dispatch(changePhoneNumber(data.phone_number));
      handleResponse(response);
    }

    if (isChangeDeliveryData) {
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
