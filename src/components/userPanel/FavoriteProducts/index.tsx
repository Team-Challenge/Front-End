import { ProductItem } from '@/components/ProductItem';
import s from './FavoriteProducts.module.scss';

export const FavoriteProducts = () => {
  return (
    <div>
      <h1 className='user-panel-title'>Обрані товари</h1>
      <div className={s.products}>
        <ProductItem
          img=''
          title='Title'
          subtitle='subtitle'
          desc="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <ProductItem
          img=''
          title='Title'
          subtitle='subtitle'
          desc="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <ProductItem
          img=''
          title='Title'
          subtitle='subtitle'
          desc="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
        <ProductItem
          img=''
          title='Title'
          subtitle='subtitle'
          desc="Some quick example text to build on the card title and make up the bulk of the card's content."
        />
      </div>
    </div>
  );
};
