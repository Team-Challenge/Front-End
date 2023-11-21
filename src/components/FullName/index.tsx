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
      regex={
        /^[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){1,4}\s[a-zA-Z\xC0-\uFFFF]+([ \-']{0,1}[a-zA-Z\xC0-\uFFFF]+){0,2}$/u
      }
      errorMessage={`Будь ласка, введіть повне ім'я, що складається лише з літер`}
      maxLength={30}
      maxLengthMessage={`Будь ласка, введіть повне ім'я, що не перевищує 30 символів`}
    />
  );
};
