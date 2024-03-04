import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { StoreHeader } from './Header';
import s from './StorePage.module.scss';
export const StorePage = () => {
  return (
    <section className={s.store}>
      <div className={`container ${s.store_container}`}>
        <Link to='/account/store/products' className={s.store_button}>
          <Icon icon='solar:alt-arrow-left-outline' /> Назад
        </Link>
        <StoreHeader />
      </div>
    </section>
  );
};
