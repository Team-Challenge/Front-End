import { Icon } from '@iconify/react';
import { UserPanelEmptyPage } from '@/components/UserPanelEmptyPage';
import s from './FavoriteProducts.module.scss';

export const FavoriteProducts = () => {
  return (
    <section>
      <UserPanelEmptyPage
        title='Ой, тут чогось бракує '
        text='Зберігайте вподобані товари, поки блукаєте нашим маркетплейсом, щоб нічого не загубилось. Вони чекатимуть на вас тут'
        icon={<Icon icon='solar:bag-heart-outline' />}
      />
      {/* <h4>Обрані товари</h4> */}
    </section>
  );
};
