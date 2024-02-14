import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import s from './AddProductButton.module.scss';

export const AddProductButton = () => {
  return (
    <Link to='/account/new-product' className={s.button}>
      Додати товар
      <Icon icon='solar:add-circle-outline' />
    </Link>
  );
};
