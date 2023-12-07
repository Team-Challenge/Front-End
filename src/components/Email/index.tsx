import { EMAIL_REGEX } from '@/constants/RegExp';
import { EmailProps } from '@/types';
import { TextInput } from '../UI/TextInput';

export const Email = ({
  required = true,
  isLogin,
  onClick,
  isLoginError,
}: EmailProps) => {
  return (
    <TextInput
      type='email'
      id='email'
      placeholder='Email'
      required={required}
      regex={EMAIL_REGEX}
      errorMessage='Будь ласка, введіть електронну адресу у форматі "email@mail.com"'
      isLogin={isLogin}
      onClick={onClick}
      isLoginError={isLoginError}
    />
  );
};
