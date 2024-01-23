import { OrnamentalTitleProps } from '@/types';
import s from './OrnamentalTitle.module.scss';

export const OrnamentalTitle = ({
  tag,
  text,
  className,
}: OrnamentalTitleProps) => {
  const Tag = tag;

  const baseClass = `${className} ${s.title}`;

  return <Tag className={`${baseClass}`}>{text}</Tag>;
};
