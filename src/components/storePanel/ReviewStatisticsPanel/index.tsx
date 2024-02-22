import { Rate } from 'antd';
import { Icon } from '@iconify/react';
import { RatingStarIcon } from '@/components/icons/RatingStarIcon';
import { Tooltip } from '@/components/UI/Tooltip';
import { RatingItem } from './RatingItem';
import s from './ReviewStatisticsPanel.module.scss';

const ratingList = [
  {
    id: 1,
    rating: 5,
    percent: 50,
    numberOfReviews: 50,
  },
  {
    id: 2,
    rating: 4,
    percent: 25,
    numberOfReviews: 25,
  },
  {
    id: 3,
    rating: 3,
    percent: 25,
    numberOfReviews: 25,
  },
  {
    id: 4,
    rating: 2,
    percent: 0,
    numberOfReviews: 0,
  },
  {
    id: 5,
    rating: 1,
    percent: 0,
    numberOfReviews: 0,
  },
];

export const ReviewStatisticsPanel = () => {
  return (
    <div className={s.statistics}>
      <div className={s.review}>
        <h4 className={s.review_title}>3</h4>
        <p className={s.review_subtitle}>Усього відгуків</p>
      </div>

      <div className={s.rating}>
        <div className={s.rating_wrap}>
          <h4 className={s.rating_overall}>4.2</h4>
          <Rate
            disabled
            allowHalf
            defaultValue={4.2}
            character={<RatingStarIcon />}
            className={s.rating_stars}
            style={{ color: '#fccf5c' }}
          />
          <p className={s.rating_subtitle}>Рейтинг магазину</p>
        </div>
      </div>

      <div className={s.scores}>
        <p className={s.hint}>
          Як розраховується рейтинг
          <Tooltip
            text=' Рейтинг магазину - це середнє значення усіх оцінок за ваші товари. Чим
          більше у вас товарів з високими оцінками - тим вище ваш рейтинг.'
            className={s.hint_tooltip}
          >
            <Icon icon='solar:question-circle-outline' />
          </Tooltip>
        </p>
        <ul className={s.scores_list}>
          {ratingList.map(({ id, rating, percent, numberOfReviews }) => (
            <li key={id} className={s.item}>
              <RatingItem
                rating={rating}
                percent={percent}
                numberOfReviews={numberOfReviews}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
