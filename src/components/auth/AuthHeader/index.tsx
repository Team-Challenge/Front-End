import { AuthHeaderProps } from '@/types';
import s from './AuthHeader.module.scss';

export const AuthHeader = ({ text }: AuthHeaderProps) => {
  return (
    <>
      <h2 className={s.title}>{text}</h2>
      <p className={s.text}>
        Lorem ipsum dolor sit amet, consectetur acing adipiscing elit adipisc
      </p>
    </>
  );
};
