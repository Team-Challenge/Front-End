import { EmptyContentPage } from '@/components/EmptyContentPage';
import { AddProductButton } from '@/components/storePanel/AddProductButton';
import s from './Products.module.scss';

export const Products = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут поки пусто'
        text='Здається, ви не додали ще жодного товару на наш маркетплейс. Додайте свої унікальні товари та почніть продавати вже зараз!'
        item={<AddProductButton />}
      />
      {/* <h4>Мої товари</h4> */}
    </section>
  );
};
