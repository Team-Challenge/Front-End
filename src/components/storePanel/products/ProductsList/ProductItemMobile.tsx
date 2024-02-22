import { ProductStoreItemProps } from '@/types';
import { useAppDispatch } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { Tooltip } from '@/components/UI/Tooltip';
import { Icon } from '@iconify/react';
import s from './ProductsList.module.scss';

export const ProductItemMobile = ({
  photos,
  title,
  date,
  code,
  price,
  category,
  status,
}: ProductStoreItemProps) => {
  const dispatch = useAppDispatch();

  const openModalWindow = () => {
    dispatch(openModal('changeProductStatus'));
  };

  const mainPhoto = photos.find((photo) => photo.main === true);
  const photo = mainPhoto?.product_photo;

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
          <span>{category}</span>
        </p>
        <p className={s.item_date}>
          Дата додавання
          <span>{date}</span>
        </p>
        <div className={s.item_status}>
          <p>
            <span>Статус</span>
            <Tooltip
              text='Щоб змінити статус товару, просто клікніть на поточний статус та оберіть інший'
              className={s.item_tooltip}
            >
              <Icon icon='solar:info-circle-outline' />
            </Tooltip>
          </p>
          <button
            type='button'
            className={s.item_status_button}
            onClick={openModalWindow}
          >
            {status}
          </button>
        </div>
      </div>
    </div>
  );
};
