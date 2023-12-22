import { Icon } from '@iconify/react';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import s from './Messages.module.scss';

export const Messages = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут поки тихо'
        text='Схоже, ви ще не розпочали жодного чату на нашому маркетплейсі. Розпочніть спілкування з продавцями і ваші діалоги з’являться тут'
        item={<Icon icon='solar:dialog-2-outline' />}
      />
    </section>
  );
};
