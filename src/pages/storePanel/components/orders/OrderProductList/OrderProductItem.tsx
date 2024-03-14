import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { OrderProductItemProps } from '@/types';
import s from './OrderProductList.module.scss';

export const OrderProductItem = ({
  img,
  productTitle,
  productCode,
  quantity,
  productPrice,
}: OrderProductItemProps) => {
  const { width } = useWindowDimensions();

  return (
    <div className={s.product}>
      <div className={s.product_img}>
        <img src={img} alt='product' />
      </div>
      <h6 className={s.product_title}>{productTitle}</h6>
      <p className={s.product_code}>Код товару: {productCode}</p>
      <p className={s.product_quantity}>
        Кількість: <span>{quantity}</span>
      </p>
      <p className={s.product_price}>
        {width >= 1260 ? 'Ціна ' : null}
        <span>{productPrice}&#x20b4;</span>
      </p>
    </div>
  );
};
