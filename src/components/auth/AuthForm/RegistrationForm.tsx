import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import { useAppDispatch } from '@/hooks/reduxHook';
import { setUser } from '@/store/auth/authSlice';
import { registration } from '@/store/auth/authThunks';
import { IUserAuth, RegistrationFormProps } from '@/types';
import { FullName } from '@/components/FullName';
import { Email } from '@/components/Email';
import { PasswordInput } from '@/components/UI/PasswordInput';
import { ButtonUI } from '@/components/UI/ButtonUI';
import s from './AuthForm.module.scss';

export const RegistrationForm = ({
  isSuccessRegistration,
}: RegistrationFormProps) => {
  const methods = useForm({
    mode: 'onChange',
  });

  const {
    register,
    getValues,
    formState: { isValid },
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
    isSuccessRegistration();
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
          <Email />
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
          />
        </div>
      </form>
    </FormProvider>
  );
};
