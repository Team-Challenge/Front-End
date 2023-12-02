import { ButtonUI } from '@/components/UI/ButtonUI';
import s from './Store.module.scss';

export const Store = () => {
  return (
    <section className={s.store}>
      <h4 className={s.store_title}>Створіть свій магазин вже прямо зараз!</h4>
      <p className={s.store_text}>
        Ваша творчість - неповторний скарб! Створіть свій власний магазин на
        нашому маркетплейсі та вже зараз покажіть усім ваші неймовірні вироби
      </p>
      <ButtonUI label='Почати продавати' className={s.store_button} />
    </section>
  );
};
