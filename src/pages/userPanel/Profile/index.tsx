import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ChangeFullNameFormData } from '@/types';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { changeFullName } from '@/store/userProfile/userProfileThunks';
import { FullName } from '@/components/FullName';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { ProfilePhoto } from './ProfilePhoto';
import s from './Profile.module.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const fullName = useAppSelector((state) => state.userProfile.full_name);

  const methods = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data: ChangeFullNameFormData) => {
    const newName = data.full_name;
    dispatch(changeFullName(newName));
  };

  return (
    <section className={s.profile}>
      <ProfilePhoto />
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
            label='Зберігти'
            className={s.form_btn}
            disabled={!methods.formState.isValid}
          />
        </form>
      </FormProvider>
    </section>
  );
};
