import { EmptyContentPage } from '@/components/EmptyContentPage';
import { Icon } from '@iconify/react';
import s from './Orders.module.scss';

export const Orders = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут поки пусто'
        text='Здається, ще ніхто не встиг придбати ваші товари. Коли це станеться, історія та статуси ваших продажів з’являться тут.'
        item={<Icon icon='solar:tag-outline' />}
      />
      {/* <h4>Замовлення</h4> */}
    </section>
  );
};
