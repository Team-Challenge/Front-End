import { useState } from 'react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { productStatusList } from '@/constants/productStatusList';
import { ProductsList } from '@/components/storePanel/ProductsList';
import { AddProductButton } from '@/components/storePanel/AddProductButton';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { ProductSorting } from '@/components/storePanel/ProductSorting';
import { Icon } from '@iconify/react';
import s from './Products.module.scss';

export const Products = () => {
  const { width } = useWindowDimensions();
  const [isProductsAvailable, setIsProductsAvailable] = useState<boolean>(true);
  const [activeButtonId, setActiveButtonId] = useState<number>(1);

  const handleButtonClick = (buttonId: number) => {
    setActiveButtonId(buttonId);
  };

  return (
    <>
      {isProductsAvailable ? (
        <section className={s.products}>
          <h4 className={s.products_title}>Мої товари</h4>
          <button className={s.products_button}>
            {width <= 500 ? 'Додати' : 'Додати товар'}
            <Icon icon='solar:add-circle-outline' />
          </button>
          <div className={s.products_status}>
            {productStatusList.map((status) => (
              <button
                key={status.id}
                className={`${s.products_status_button} ${
                  status.id === activeButtonId ? s.active : ''
                }`}
                onClick={() => handleButtonClick(status.id)}
              >
                {status.label}
              </button>
            ))}
          </div>
          <ProductSorting />
          <ProductsList />
        </section>
      ) : (
        <EmptyContentPage
          title='Ой, тут поки пусто'
          text='Здається, ви не додали ще жодного товару на наш маркетплейс. Додайте свої унікальні товари та почніть продавати вже зараз!'
          item={<AddProductButton />}
        />
      )}
    </>
  );
};
