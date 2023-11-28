import { OrnamentalTitleProps } from '@/types';
import s from './OrnamentalTitle.module.scss';

export const OrnamentalTitle = ({ tag, text }: OrnamentalTitleProps) => {
  const Tag = tag;

  return <Tag className={s.title}>{text}</Tag>;
};
