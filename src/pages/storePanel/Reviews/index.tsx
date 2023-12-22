import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import s from './Reviews.module.scss';

export const Reviews = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут поки пусто'
        text='Здається, ще ніхто не залишив відгуки про ваші товари. Коли хтось придбає та оцінить ваш товар, нові відгуки та рейтинг з’являться тут'
        item={<Icon icon='solar:chat-round-like-outline' />}
      />
      {/* <h4>Відгуки та рейтинг</h4> */}
    </section>
  );
};
