import { RatingItemProps } from '@/types';
import { RatingStarIcon } from '@/components/icons/RatingStarIcon';
import s from './ReviewStatisticsPanel.module.scss';

export const RatingItem = ({
  rating,
  percent,
  numberOfReviews,
}: RatingItemProps) => {
  return (
    <>
      <RatingStarIcon size='small' className={s.item_stars} />
      <p className={s.item_rating}>{rating}</p>
      <div className={s.item_progress}>
        <div style={{ width: `${percent}%` }} />
      </div>
      <p className={s.item_count}>{numberOfReviews}</p>
    </>
  );
};
