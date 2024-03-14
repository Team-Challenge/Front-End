import { Icon } from '@iconify/react';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { emptySectionText } from '@/constants/emptySectionText';
// import s from './Messages.module.scss';

export const Messages = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут поки тихо'
        text={emptySectionText.messages}
        item={<Icon icon='solar:dialog-2-outline' />}
      />
    </section>
  );
};
