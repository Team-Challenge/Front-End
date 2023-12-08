import { UserPanelEmptyPageProps } from '@/types';
import s from './UserPanelEmptyPage.module.scss';

export const UserPanelEmptyPage = ({
  title,
  text,
  icon,
}: UserPanelEmptyPageProps) => {
  return (
    <div className={s.section}>
      <h4 className={s.section_title}>{title}</h4>
      <p className={s.section_text}>{text}</p>
      {icon}
    </div>
  );
};
