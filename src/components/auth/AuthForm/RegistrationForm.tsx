import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { API_URL } from '@/http';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useAppDispatch } from '@/hooks/reduxHook';
import { setUser, setAuth } from '@/store/auth/authSlice';
import { registration } from '@/store/auth/authThunks';
import { IUserAuth, RegistrationFormProps } from '@/types';
import { FullName } from '@/components/FullName';
import { Email } from '@/components/Email';
import { ButtonUI, PasswordInput } from '@/components/UI';
import s from './AuthForm.module.scss';

export const RegistrationForm = ({
  isSuccessRegistration,
}: RegistrationFormProps) => {
  const dispatch = useAppDispatch();
  const methods = useForm({
    mode: 'onChange',
  });

  const {
    register,
    getValues,
    setError,
    formState: { errors, isValid },
  } = methods;

  const googleLogin = useGoogleLogin({
    onSuccess: async (codeResponse) => {
      try {
        const response = await axios.post(`${API_URL}/accounts/authorize`, {
          id_token: codeResponse.code,
        });
        if (response.status === 200) {
          localStorage.setItem('token', response.data.access_token),
            localStorage.setItem('refresh', response.data.refresh_token);
          dispatch(setAuth(true));
          isSuccessRegistration();
        }
        console.log(response.data);
      } catch (error) {
        console.error(error);
      }
    },
    flow: 'auth-code',
    redirect_uri: 'http://localhost:8000',
  });

  const hasError = Boolean(errors.registrationError);

  const onSubmit: SubmitHandler<IUserAuth> = async (data) => {
    try {
      const postData = {
        full_name: data.full_name,
        email: data.email,
        password: data.password,
      };

      await dispatch(registration(postData)).unwrap();
      dispatch(setUser(postData));
      isSuccessRegistration();
    } catch (error: unknown) {
      setError('registrationError', {
        type: 'manual',
        message:
          'На жаль, користувач з такою адресою вже існує. Будь ласка, використайте іншу електронну адресу',
      });
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        id='registration'
        className={s.form}
        onSubmit={(e) => e.preventDefault()}
      >
        <div className={s.form_inputs}>
          <FullName />
          <Email
            isServerValidation={hasError}
            isServerError={hasError}
            onClick={() => methods.clearErrors('registrationError')}
          />
          {hasError && (
            <p className={`error-text ${s.registration_error}`}>
              {errors?.registrationError?.message as string}
            </p>
          )}
          <PasswordInput id='password' placeholder='Пароль' required />
          <PasswordInput
            id='passwordRepeat'
            placeholder='Повторіть пароль'
            required
            validate={(value: string) =>
              value === getValues('password') || 'Введені паролі не співпадають'
            }
            isRepeatPassword
          />
        </div>

        <div className={s.checkbox}>
          <input
            type='checkbox'
            id='checkbox'
            className={s.checkbox_input}
            {...register('checkbox', {
              required: true,
            })}
          />
          <p className={s.checkbox_text}>
            Погоджуюсь з <span>Умовами надання послуг</span> та{' '}
            <span>Політикою конфіденційності</span>
          </p>
        </div>

        <div className={s.form_buttons}>
          <ButtonUI
            type='submit'
            label='Зареєструватися'
            variant='main'
            disabled={!isValid}
            onClick={methods.handleSubmit(
              onSubmit as SubmitHandler<FieldValues>,
            )}
          />
          <span className={s.decorative_line}>або</span>
          <ButtonUI
            type='button'
            label='Зареєструватися через Google'
            variant='secondary'
            onClick={() => googleLogin()}
          />
        </div>
      </form>
    </FormProvider>
  );
};
