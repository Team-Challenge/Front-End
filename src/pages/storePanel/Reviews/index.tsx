import { useState } from 'react';
import { ReviewStatisticsPanel } from '@/components/storePanel/ReviewStatisticsPanel';
import { ReviewsList } from '@/components/storePanel/ReviewsList';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import s from './Reviews.module.scss';

export const Reviews = () => {
  const [isReviewsAvailable, setIsReviewsAvailable] = useState<boolean>(true);

  return (
    <>
      {isReviewsAvailable ? (
        <section className={s.reviews}>
          <h4 className={s.reviews_title}>Відгуки та рейтинг</h4>
          <ReviewStatisticsPanel />
          <ReviewsList />
        </section>
      ) : (
        <EmptyContentPage
          title='Ой, тут поки пусто'
          text='Здається, ще ніхто не залишив відгуки про ваші товари. Коли хтось придбає та оцінить ваш товар, нові відгуки та рейтинг з’являться тут'
          item={<Icon icon='solar:chat-round-like-outline' />}
        />
      )}
    </>
  );
};
