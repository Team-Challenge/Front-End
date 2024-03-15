import { useState } from 'react';
import { EmptyContentPage } from '@/components/UI';
import { emptySectionText } from '@/constants/emptySectionText';
import { Icon } from '@iconify/react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { ReviewsList } from '../components/ReviewsList';
import { ReviewStatisticsPanel } from '../components/ReviewStatisticsPanel';
import s from './Reviews.module.scss';

export const Reviews = () => {
  const { width } = useWindowDimensions();
  const [isReviewsAvailable, setIsReviewsAvailable] = useState<boolean>(true);

  return isReviewsAvailable ? (
    <section className={s.reviews}>
      {width >= 991.98 && (
        <h4 className={s.reviews_title}>Відгуки та рейтинг</h4>
      )}
      <ReviewStatisticsPanel />
      <ReviewsList />
    </section>
  ) : (
    <EmptyContentPage
      title='Ой, тут поки пусто'
      text={emptySectionText.reviewsStorePanel}
      item={<Icon icon='solar:chat-round-like-outline' />}
    />
  );
};
