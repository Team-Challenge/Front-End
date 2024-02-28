import { calculateTotalPrice } from '@/utils/calculateTotalPrice';
import { OrderProductItem } from './OrderProductItem';
import s from './OrderProductList.module.scss';

const products = [
  {
    img: '',
    title: 'Каблучка “Вишивка”',
    code: 'КВ1234',
    quantity: '1',
    price: '690',
  },
  {
    img: '',
    title: 'Каблучка “Вишивка”',
    code: 'КВ555234',
    quantity: '1',
    price: '690',
  },
  {
    img: '',
    title: 'Каблучка “Вишивка”',
    code: 'КВ154',
    quantity: '3',
    price: '700',
  },
];

export const OrderProductList = () => {
  const totalAmount = calculateTotalPrice(products);

  return (
    <div className={s.products}>
      <div className={s.products_list}>
        {products.map(({ img, title, code, quantity, price }) => (
          <OrderProductItem
            key={code}
            img={img}
            productTitle={title}
            productCode={code}
            quantity={quantity}
            productPrice={price}
          />
        ))}
      </div>
      <div className={s.products_total}>
        <p>Разом</p>
        <p>{totalAmount}&#x20b4;</p>
      </div>
    </div>
  );
};
