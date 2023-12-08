import { Icon } from '@iconify/react';
import { UserPanelEmptyPage } from '@/components/UserPanelEmptyPage';
import s from './Messages.module.scss';

export const Messages = () => {
  return (
    <section>
      <UserPanelEmptyPage
        title='Ой, тут поки тихо'
        text='Схоже, ви ще не розпочали жодного чату на нашому маркетплейсі. Розпочніть спілкування з продавцями і ваші діалоги з’являться тут'
        icon={<Icon icon='solar:dialog-2-outline' />}
      />
    </section>
  );
};
