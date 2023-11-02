import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useAppDispatch } from '@/hooks/reduxHook';
import { setUser } from '@/store/auth/authSlice';
import { registration } from '@/store/auth/authThunks';
import { AuthData, IUserAuth } from '@/types';
import { FullName } from '@/components/FullName';
import { Email } from '@/components/Email';
import { PasswordInput } from '@/components/UI/PasswordInput';
import { AuthButton } from '../AuthButton';
import s from './AuthForm.module.scss';

export const RegistrationForm = ({ openModal }: AuthData) => {
  const methods = useForm({
    mode: 'onChange',
  });

  const {
    register,
    getValues,
    formState: { errors, isValid },
  } = methods;

  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IUserAuth> = (data) => {
    const postData = {
      full_name: data.full_name,
      email: data.email,
      password: data.password,
    };
    dispatch(registration(postData));
    dispatch(setUser(postData));
  };

  return (
    <FormProvider {...methods}>
      <form
        id='registration'
        className={s.form}
        onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <FullName placeholder='Full Name' />
        <Email />

        <PasswordInput id='password' placeholder='Pass' required />
        {errors.password && (
          <p className={`${s.error}`}>{errors.password.message as string}</p>
        )}

        <PasswordInput
          id='passwordRepeat'
          placeholder='Repeat Pass'
          required
          validate={(value: string) =>
            value === getValues('password') || 'Passwords do not match'
          }
        />
        {errors.passwordRepeat && (
          <p className={`${s.error}`}>Passwords do not match</p>
        )}

        <div className={s.checkbox}>
          <input
            type='checkbox'
            id='checkbox'
            {...register('checkbox', {
              required: true,
            })}
          />
          <span className={s.checkbox_text}>
            Створюючи обліковий запис, ви погоджуєтеся з нашими Умовами надання
            послуг, Політикою конфіденційності та стандартними налаштуваннями
            сповіщень.
          </span>
        </div>

        <AuthButton
          text='Далі'
          variant='main'
          disabled={!isValid}
          onClick={openModal}
        />
      </form>
    </FormProvider>
  );
};
