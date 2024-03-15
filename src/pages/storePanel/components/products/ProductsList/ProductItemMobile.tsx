import { ProductStoreItemProps } from '@/types';
import { categoryList } from '@/constants/categoryList';
import { Tooltip } from '@/components/UI';
import { Icon } from '@iconify/react';
import s from './ProductsList.module.scss';

export const ProductItemMobile = ({
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
    <div className={s.item}>
      <div className={s.header}>
        <div className={s.header_img}>
          <img src={photo} alt='product' />
        </div>
        <p className={s.header_subtitle}>Товар</p>
        <h5 className={s.header_title}>{title}</h5>
        <button type='button' className={s.header_edit}>
          <Icon icon='solar:pen-outline' />
        </button>
      </div>

      <div className={s.item_wrap}>
        <p className={s.item_price}>
          Ціна
          <span>{price}₴</span>
        </p>
        <p className={s.item_code}>
          Код
          <span>{code}</span>
        </p>
        <p className={s.item_category}>
          Категорія
          <span>{category?.label}</span>
        </p>
        <p className={s.item_date}>
          Дата додавання
          <span>{date}</span>
        </p>
        <div className={s.item_status}>
          <div className={s.item_status_wrap}>
            <span>Статус</span>
            <Tooltip
              text='Щоб змінити статус товару, просто клікніть на поточний статус та оберіть інший'
              className={s.item_tooltip}
            >
              <Icon icon='solar:info-circle-outline' />
            </Tooltip>
          </div>
          <button
            type='button'
            className={s.item_status_button}
            onClick={onClick}
          >
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};
