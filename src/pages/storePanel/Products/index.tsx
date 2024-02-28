import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '@/hooks/reduxHook';
import { getAllProductsInfo } from '@/store/productPage/productPageThunks';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import { productStatusList } from '@/constants/statusesList';
import { ButtonsBar } from '@/components/ButtonsBar';
import { ProductsList } from '@/components/storePanel/products/ProductsList';
import { AddProductButton } from '@/components/storePanel/AddProductButton';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Sorting } from '@/components/Sorting';
import { Icon } from '@iconify/react';
import s from './Products.module.scss';

export const Products = () => {
  const { width } = useWindowDimensions();
  const { products } = useAppSelector((state) => state.product);
  const dispatch = useAppDispatch();
  const [selectedStatus, setSelectedStatus] = useState<string>('Всі');

  const isProductsAvailable = products.length > 0;

  const handleStatusChange = (newStatus: string) => {
    setSelectedStatus(newStatus);
  };

  useEffect(() => {
    dispatch(getAllProductsInfo());
  }, []);

  return isProductsAvailable ? (
    <section className={s.products}>
      <h4 className={s.products_title}>Мої товари</h4>
      <Link to='/account/new-product' className={s.products_button}>
        {width <= 500 ? 'Додати' : 'Додати товар'}
        <Icon icon='solar:add-circle-outline' />
      </Link>
      <ButtonsBar
        buttonsList={productStatusList}
        className={s.products_status}
        onStatusChange={handleStatusChange}
      />
      <Sorting className={s.products_sorting} />
      <ProductsList selectedStatus={selectedStatus} />
    </section>
  ) : (
    <EmptyContentPage
      title='Ой, тут поки пусто'
      text='Здається, ви не додали ще жодного товару на наш маркетплейс. Додайте свої унікальні товари та почніть продавати вже зараз!'
      item={<AddProductButton />}
    />
  );
};
