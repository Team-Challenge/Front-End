import { ProductItemProps } from '@/types';
import s from './ProductItem.module.scss';

export const ProductItem = ({
  img,
  title,
  subtitle,
  desc,
  link,
}: ProductItemProps) => {
  return (
    <div className={s.item}>
      <div className={s.img}>
        <img src={img} alt={title} />
      </div>
      <div className={s.wrap}>
        <h3 className={s.title}>{title}</h3>
        <p className={s.subtitle}>{subtitle}</p>
        <p className={s.desc}>{desc}</p>
        <button type='submit' className={s.btn}>
          Go somewhere
        </button>
      </div>
    </div>
  );
};
