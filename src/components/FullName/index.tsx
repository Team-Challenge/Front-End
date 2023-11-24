import { FULL_NAME_REGEX } from '@/constants/RegExp';
import { TextInput } from '../UI/TextInput';

interface FullNameProps {
  placeholder: string;
}

export const FullName = ({ placeholder }: FullNameProps) => {
  return (
    <TextInput
      type='text'
      id='full_name'
      placeholder={placeholder}
      required
      regex={FULL_NAME_REGEX}
      errorMessage={`Будь ласка, введіть повне ім'я, що складається лише з літер`}
      maxLength={30}
      maxLengthMessage={`Будь ласка, введіть повне ім'я, що не перевищує 30 символів`}
    />
  );
};
