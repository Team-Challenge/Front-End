import {
  useForm,
  SubmitHandler,
  FormProvider,
  FieldValues,
} from 'react-hook-form';
import { useAppDispatch } from '@/hooks/reduxHook';
import { login } from '@/store/auth/authThunks';
import { IUserAuth, LoginFormProps } from '@/types';
import { Email } from '@/components/Email';
import { PasswordInput } from '@/components/UI/PasswordInput';
import { ButtonUI } from '@/components/UI/ButtonUI';
import s from './AuthForm.module.scss';

export const LoginForm = ({
  isForgotPassword,
  isSuccessLogin,
}: LoginFormProps) => {
  const dispatch = useAppDispatch();

  const methods = useForm({
    mode: 'onChange',
    shouldUnregister: true,
  });

  const {
    setError,
    formState: { errors, isValid },
  } = methods;

  const hasError = Boolean(errors.loginError);

  const onSubmit: SubmitHandler<IUserAuth> = async (data) => {
    try {
      await dispatch(login(data)).unwrap();
      isSuccessLogin();
    } catch (error: any) {
      setError('loginError', {
        type: 'manual',
        message:
          'Неправильно введені дані. Будь ласка, перевірте та спробуйте ще раз',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id='login'
        className={s.form}
        onSubmit={methods.handleSubmit(onSubmit as SubmitHandler<FieldValues>)}
      >
        <div className={s.form_inputs}>
          <Email
            isLogin
            isLoginError={hasError}
            onClick={() => methods.clearErrors('loginError')}
          />
          <PasswordInput
            id='password'
            placeholder='Пароль'
            required
            isLogin
            isLoginError={hasError}
            onClick={() => methods.clearErrors('loginError')}
          />
        </div>

        {hasError && (
          <p className={`error-text ${s.login_error}`}>
            {errors?.loginError?.message as string}
          </p>
        )}

        <button
          type='button'
          onClick={isForgotPassword}
          className={s.forgot_password_button}
        >
          Забули пароль?
        </button>

        <div className={s.form_buttons}>
          <ButtonUI label='Увійти' variant='main' disabled={!isValid} />
          <span className={s.decorative_line}>або</span>
          <ButtonUI
            type='button'
            label='Увійти через Google'
            variant='secondary'
          />
        </div>
      </form>
    </FormProvider>
  );
};
