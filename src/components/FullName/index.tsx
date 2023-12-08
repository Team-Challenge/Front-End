import { FULL_NAME_REGEX } from '@/constants/RegExp';
import { FullNameProps } from '@/types';
import { TextInput } from '../UI/TextInput';

export const FullName = ({ value, editModeIcon }: FullNameProps) => {
  return (
    <TextInput
      type='text'
      id='full_name'
      placeholder='Ім’я та Прізвище'
      required
      regex={FULL_NAME_REGEX}
      errorMessage={`Будь ласка, введіть повне ім'я, що складається лише з літер`}
      maxLength={30}
      maxLengthMessage={`Будь ласка, введіть повне ім'я, що не перевищує 30 символів`}
      editModeIcon={editModeIcon}
      value={value}
    />
  );
};
