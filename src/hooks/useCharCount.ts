import { useState, ChangeEvent } from 'react';

export const useCharCount = (initialValue: string, maxLength: number) => {
  const [charCount, setCharCount] = useState<number>(initialValue ? initialValue.length : 0);

  const handleInput = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    if (maxLength && event.target.value.length > maxLength) {
      event.target.value = event.target.value.slice(0, maxLength);
    }

    setCharCount(event.target.value.length);
  };

  return { charCount, handleInput };
};
