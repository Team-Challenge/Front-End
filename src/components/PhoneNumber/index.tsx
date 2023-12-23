import { PHONE_NUMBER_REGEX } from '@/constants/RegExp';
import { PhoneNumberProps } from '@/types';
import { TextInput } from '../UI/TextInput';

export const PhoneNumber = ({ userPhoneNumber }: PhoneNumberProps) => {
  const value = userPhoneNumber ? userPhoneNumber : undefined;

  return (
    <TextInput
      type='text'
      id='phone_number'
      placeholder='Номер телефону'
      value={value}
      required={false}
      regex={PHONE_NUMBER_REGEX}
      errorMessage='Будь ласка, введіть справний український номер телефону, який розпочинається з +380'
      editModeIcon
    />
  );
};
