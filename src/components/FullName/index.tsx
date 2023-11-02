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
      errorMessage='Only letters'
      maxLength={50}
      maxLengthMessage='The name is too long'
    />
  );
};
