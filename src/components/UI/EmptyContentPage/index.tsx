import { EmptyContentPageProps } from '@/types';
import s from './EmptyContentPage.module.scss';

export const EmptyContentPage = ({
  title,
  text,
  item,
}: EmptyContentPageProps) => {
  return (
    <div className={s.section}>
      <h4 className={s.section_title}>{title}</h4>
      <p className={s.section_text}>{text}</p>
      {item}
    </div>
  );
};
