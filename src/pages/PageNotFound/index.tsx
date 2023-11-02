import s from './PageNotFound.module.scss';

export const PageNotFound = () => {
  return (
    <section className={s.section}>
      <h1 className='user-panel-title'>Ops. Something wrong :(</h1>
      <p className={s.text}>
        The page you are looking for cannot be found. Please check the URL.
      </p>
    </section>
  );
};
