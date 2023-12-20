import { Icon } from '@iconify/react';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import s from './FavoriteProducts.module.scss';

export const FavoriteProducts = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут чогось бракує '
        text='Зберігайте вподобані товари, поки блукаєте нашим маркетплейсом, щоб нічого не загубилось. Вони чекатимуть на вас тут'
        item={<Icon icon='solar:bag-heart-outline' />}
      />
      {/* <h4>Обрані товари</h4> */}
    </section>
  );
};
