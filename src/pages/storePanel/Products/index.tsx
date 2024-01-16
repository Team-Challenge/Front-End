import { useState } from 'react';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { productStatusList } from '@/constants/productStatusList';
import { ButtonsBar } from '@/components/ButtonsBar';
import { ProductsList } from '@/components/storePanel/products/ProductsList';
import { AddProductButton } from '@/components/storePanel/AddProductButton';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { ProductSorting } from '@/components/storePanel/products/ProductSorting';
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
          <ButtonsBar
            buttonsList={productStatusList}
            className={s.products_status}
          />
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
