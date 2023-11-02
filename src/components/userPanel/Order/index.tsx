import { buttonOrderData } from '@/constants';
import { ProductItem } from '@/components/ProductItem';
import s from './Order.module.scss';

export const Order = () => {
  return (
    <div>
      <h1 className='user-panel-title'>Ваші замовлення</h1>
      <div className={s.buttons}>
        {buttonOrderData.map((button) => (
          <button type='submit' key={button.id} className={s.button}>
            {button.label}
          </button>
        ))}
      </div>
      <div className={s.order}>
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
