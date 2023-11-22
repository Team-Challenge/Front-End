import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { ChangeFullNameFormData } from '@/types';
import { useAppDispatch } from '@/hooks/reduxHook';
import { changeFullName } from '@/store/userSettings/userSettingsThunks';
import { FullName } from '@/components/FullName';
import { ButtonUI } from '@/components/UI/ButtonUI';
import { ProfilePhoto } from './ProfilePhoto';
import s from './Profile.module.scss';

export const Profile = () => {
  const methods = useForm();

  const {
    formState: { isValid },
  } = methods;

  const dispatch = useAppDispatch();

  const onSubmit = (data: ChangeFullNameFormData) => {
    const newName = data.full_name;
    dispatch(changeFullName(newName));
  };

  return (
    <div>
      <h4 className='user-panel-title'>Профіль</h4>
      <ProfilePhoto />
      <h5 className='user-panel-subtitle'>Налаштування профілю</h5>
      <FormProvider {...methods}>
        <form
          id='changeFullName'
          className={s.form}
          onSubmit={methods.handleSubmit(
            onSubmit as SubmitHandler<FieldValues>,
          )}
        >
          <label className={s.form_label}>
            Ім’я та Прізвище
            <FullName placeholder={`Ім'я користувача`} />
          </label>
          <ButtonUI
            label='Зберігти'
            className={s.form_btn}
            disabled={!isValid}
          />
        </form>
      </FormProvider>
    </div>
  );
};
