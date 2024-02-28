import { Rate } from 'antd';
import { ReviewItemProps } from '@/types';
import { RatingStarIcon } from '@/components/icons/RatingStarIcon';
import s from './ReviewsList.module.scss';

export const ReviewItem = ({
  productPhoto,
  productName,
  rating,
  feedback,
  userPhoto,
  userName,
  date,
}: ReviewItemProps) => {
  return (
    <div className={s.item}>
      <div className={s.product_img}>
        <img src={productPhoto} alt='product' />
      </div>

      <div className={s.feedback}>
        <Rate
          disabled
          defaultValue={rating}
          character={<RatingStarIcon />}
          style={{ color: '#fccf5c' }}
        />
        <h5 className={s.feedback_subtitle}>{productName}</h5>
        <p className={s.feedback_text}>{feedback}</p>
      </div>

      <div className={s.user}>
        <div className={s.user_img}>
          <img src={userPhoto} alt='user' />
        </div>
        <p className={s.user_name}>{userName}</p>
        <p className={s.date}>{date}</p>
      </div>
    </div>
  );
};
