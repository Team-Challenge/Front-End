import s from './StoreReviews.module.scss';

export const StoreReviews = () => {
  return (
    <div className={s.reviews}>
      <p className={s.reviews_empty}>
        Ой, тут поки пусто.
        <br />
        Якщо у вас є питання або потреба в додатковій інформації, не соромтесь
        звертатися до майстра.
        <br />
        Вам завжди готові допомогти!
      </p>
    </div>
  );
};
