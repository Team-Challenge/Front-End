import s from './Home.module.scss';

export const Home = () => {
  return (
    <main className={`container ${s.home}`}>
      <h3>Welcome to our marketplace.</h3>
    </main>
  );
};
