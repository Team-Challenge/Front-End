import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/reduxHook';
import { checkAuth } from './store/auth/authActions';
import { setAuth } from './store/auth/authSlice';
import { PageNotFound, SignIn, SignUp, UserPanel } from './pages';
import './App.scss';

export const App = () => {
  const { isAuth } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      checkAuth();
      dispatch(setAuth(true));
    }
  }, []);

  return (
    <div>
      <Routes>
        {!isAuth ? (
          <>
            <Route path='/' element={<SignUp />} />
            <Route path='/signin' element={<SignIn />} />
          </>
        ) : (
          <>
            {['/', '/userpanel', '/signin'].map((path) => (
              <Route key={path} path={path} element={<UserPanel />} />
            ))}
          </>
        )}
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </div>
  );
};
