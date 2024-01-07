import { ReviewItem } from './ReviewItem';
import s from './ReviewsList.module.scss';

export const ReviewsList = () => {
  return (
    <ul className={s.review_list}>
      <li className={s.review_item}>
        <ReviewItem
          productPhoto=''
          productName='Каблучка Вишиванка'
          rating={5}
          feedback='Неймовірна прикраса, дуже привітний та відповідальний продавець і головне - який красивий та зручний маркетплейс! Просто нема слів! Колечко прийшло таке ж як на фото, рекомендую.'
          userPhoto=''
          userName='Cтепан Гіга'
          date='10.02.2023'
        />
      </li>
    </ul>
  );
};
