import { Icon } from '@iconify/react';
import { EmptyContentPage } from '@/components/EmptyContentPage';
import { emptySectionText } from '@/constants/emptySectionText';
// import s from './FavoriteProducts.module.scss';

export const FavoriteProducts = () => {
  return (
    <section>
      <EmptyContentPage
        title='Ой, тут чогось бракує '
        text={emptySectionText.favorite}
        item={<Icon icon='solar:bag-heart-outline' />}
      />
      {/* <h4>Обрані товари</h4> */}
    </section>
  );
};
