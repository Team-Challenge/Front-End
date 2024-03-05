import { useState } from 'react';
import { useAppSelector } from '@/hooks/reduxHook';
import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { StoreProducts } from './components/StoreProducts';
import { StoreReviews } from './components/StoreReviews';
import { StoreHeader } from './Header';
import s from './StorePage.module.scss';

export const StorePage = () => {
  const [activeButton, setActiveButton] = useState<string>('products');
  const { products } = useAppSelector((state) => state.product);
  const isProducts = products.length > 0;
  const productQuantity = isProducts ? products.length : 0;

  const handleChangeScreen = (screen: string) => {
    setActiveButton(screen);
  };

  return (
    <section className={s.store}>
      <Link to='/account/store/products' className={s.store_return}>
        <Icon icon='solar:alt-arrow-left-outline' /> Назад
      </Link>
      <StoreHeader />

      <div className={s.store_buttons}>
        <button
          type='button'
          className={`${s.store_button} ${
            activeButton === 'products' && s.store_button_active
          }`}
          onClick={() => handleChangeScreen('products')}
        >
          Товари {`(${productQuantity})`}
        </button>
        <button
          type='button'
          className={`${s.store_button} ${
            activeButton === 'reviews' && s.store_button_active
          }`}
          onClick={() => handleChangeScreen('reviews')}
        >
          Відгуки (0)
        </button>
      </div>
      {activeButton === 'products' && <StoreProducts />}
      {activeButton === 'reviews' && <StoreReviews />}
    </section>
  );
};