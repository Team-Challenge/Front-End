import { TextInput } from '../UI/TextInput';

interface EmailProps {
  required?: boolean;
}

export const Email = ({ required = true }: EmailProps) => {
  return (
    <TextInput
      type='email'
      id='email'
      placeholder='Email'
      required={required}
      regex={/^[\p{L}\p{N}_.-]+@([\p{L}\p{N}-]+\.)+[\p{L}\p{N}-]{2,}$/gu}
      errorMessage='The email should be in the format "email@mail.com"'
    />
  );
};
