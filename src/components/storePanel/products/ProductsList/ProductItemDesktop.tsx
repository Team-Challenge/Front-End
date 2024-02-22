import { ProductStoreItemProps } from '@/types';
import { useAppDispatch } from '@/hooks/reduxHook';
import { openModal } from '@/store/modalSlice';
import { Icon } from '@iconify/react';
import s from './ProductsList.module.scss';

export const ProductItemDesktop = ({
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
    <>
      <div className={s.cell_img}>
        <img src={photo} alt='product' />
      </div>
      <h5 className={s.cell_title}>{title}</h5>
      <p className={s.cell_date}>{date}</p>
      <p className={s.cell_code}>{code}</p>
      <p className={s.cell_price}>{price}₴</p>
      <p className={s.cell_category}>{category}</p>
      <div className={s.cell_buttons}>
        <button
          type='button'
          className={s.cell_status}
          onClick={openModalWindow}
        >
          {status}
        </button>
        <button type='button' className={s.cell_edit}>
          <Icon icon='solar:pen-outline' />
        </button>
      </div>
    </>
  );
};
