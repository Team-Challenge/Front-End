import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ChangeFullNameFormData } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import {
  changeFullName,
  getUserInfo,
} from '@/store/userProfile/userProfileThunks';
import { ProfilePhoto } from '@/components/ProfilePhoto';
import { FullName } from '@/components/FullName';
import { ButtonUI } from '@/components/UI/ButtonUI';
import defaultUserPic from '@assets/default-user-pic.svg';
import s from './Profile.module.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const fullName = useAppSelector((state) => state.userProfile.full_name);
  const userPhoto = useAppSelector(
    (state) => state.userProfile.profile_picture,
  );

  const methods = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: ChangeFullNameFormData) => {
    const newName = data.full_name;
    dispatch(changeFullName(newName));
    dispatch(getUserInfo());
  };

  return (
    <section className={s.profile}>
      <ProfilePhoto
        isUser
        defaultPhoto={defaultUserPic}
        modalId='userPhoto'
        profilePhoto={userPhoto}
      />
      <h4 className={s.profile_title}>Персональні дані</h4>
      <FormProvider {...methods}>
        <form
          id='fullNameSetting'
          className={s.form}
          onSubmit={methods.handleSubmit(
            onSubmit as SubmitHandler<FieldValues>,
          )}
        >
          <label className={s.form_label}>
            Ім’я та Прізвище
            <FullName value={fullName as string} editModeIcon />
          </label>
          <ButtonUI
            label='Зберегти'
            className={s.form_btn}
            disabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </section>
  );
};
