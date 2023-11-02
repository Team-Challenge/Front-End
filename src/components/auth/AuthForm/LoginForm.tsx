import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '@/hooks/reduxHook';
import { login } from '@/store/auth/authThunks';
import { IUserAuth } from '@/types';
import { PasswordInput } from '@/components/UI/PasswordInput';
import { Email } from '@/components/Email';
import { AuthButton } from '../AuthButton';
import s from './AuthForm.module.scss';

export const LoginForm = () => {
  const methods = useForm({
    mode: 'onChange',
  });

  const navigate = useNavigate();
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const {
    formState: { errors, isValid },
  } = methods;

  const onSubmit: SubmitHandler<IUserAuth> = (data) => {
    dispatch(login(data));
  };
  const isUserAuth = () => {
    if (isAuth) {
      navigate('/userpanel');
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id='login'
        className={s.form}
        onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <Email />

        <PasswordInput id='password' placeholder='Pass' required />
        {errors.password && (
          <p className={`${s.error}`}>{errors.password.message as string}</p>
        )}

        <AuthButton
          text='Далі'
          variant='main'
          disabled={!isValid}
          onClick={isUserAuth}
        />
      </form>
    </FormProvider>
  );
};
