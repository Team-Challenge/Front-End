import { ProductStoreItemProps } from '@/types';
import { categoryList } from '@/constants/categoryList';
import { Icon } from '@iconify/react';
import s from './ProductsList.module.scss';

export const ProductItemDesktop = ({
  photos,
  title,
  date,
  code,
  price,
  categoryId,
  status,
  onClick,
}: ProductStoreItemProps) => {
  const mainPhoto = photos.find((photo) => photo.main === true);
  const photo = mainPhoto?.product_photo;

  const category = categoryList.find((item) => item.id === categoryId);

  return (
    <>
      <div className={s.cell_img}>
        <img src={photo} alt='product' />
      </div>
      <h5 className={s.cell_title}>{title}</h5>
      <p className={s.cell_date}>{date}</p>
      <p className={s.cell_code}>{code}</p>
      <p className={s.cell_price}>{price}₴</p>
      <p className={s.cell_category}>{category?.label}</p>
      <div className={s.cell_buttons}>
        <button type='button' className={s.cell_status} onClick={onClick}>
          {status}
        </button>
        <button type='button' className={s.cell_edit}>
          <Icon icon='solar:pen-outline' />
        </button>
      </div>
    </>
  );
};
