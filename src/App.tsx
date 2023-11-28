import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from './hooks/reduxHook';
import { checkAuth } from './store/auth/authActions';
import { setAuth } from './store/auth/authSlice';
import { PageNotFound, UserPanel, Home } from './pages';
import { Header } from './components/Header';

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
      <Header />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='*' element={<PageNotFound />} />
        {isAuth && <Route path='/userpanel' element={<UserPanel />} />}
      </Routes>
    </div>
  );
};
