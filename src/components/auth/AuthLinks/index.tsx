import { Link } from 'react-router-dom';
import { AuthData } from '@/types';
import s from './AuthLinks.module.scss';

export const AuthLink = ({ isRegistration }: AuthData) => {
  return (
    <div className={s.wrap}>
      <p>
        {isRegistration
          ? 'Вже маєте обліковий запис?'
          : "Don't have an account yet?"}
      </p>
      <Link to={isRegistration ? '/signin' : '/'}>
        {isRegistration ? 'Увійдіть в систему' : 'Sign up now'}
      </Link>
    </div>
  );
};
