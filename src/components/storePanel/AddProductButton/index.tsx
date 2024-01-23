import { Icon } from '@iconify/react';
import s from './AddProductButton.module.scss';

export const AddProductButton = () => {
  return (
    <button className={s.button}>
      Додати товар
      <Icon icon='solar:add-circle-outline' />
    </button>
  );
};
