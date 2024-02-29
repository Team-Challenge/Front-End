import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useWindowDimensions } from './hooks/useWindowDimensions';
import { useAppDispatch, useAppSelector } from './hooks/reduxHook';
import { checkAuth } from './store/auth/authActions';
import { getUserInfo } from './store/userProfile/userProfileThunks';
import { getStoreInfo } from './store/storeProfile/storeProfileThunks';
import {
  getNovaPostInfo,
  getUkrPostInfo,
} from './store/deliveryOptions/deliveryThunks';
import { PageNotFound, Home, ProductAddPage, StorePage } from './pages';
import { Header } from './components/Header';
import { UserPanelRoutes } from './components/routes/UserPanelRoutes';
import { StorePanelRoutes } from './components/routes/StorePanelRoutes';
import { BurgerMenu } from './components/BurgerMenu';

export const App = () => {
  const dispatch = useAppDispatch();
  const { width } = useWindowDimensions();
  const { isAuth } = useAppSelector((state) => state.auth);
  const { hasStore } = useAppSelector((state) => state.storeProfile);
  const isBurgerMenuOpen = useAppSelector(
    (state) => state.overlayState.isBurgerMenu,
  );

  useEffect(() => {
    if (localStorage.getItem('token')) {
      dispatch(checkAuth());
      dispatch(getUserInfo());
      dispatch(getStoreInfo());
      dispatch(getNovaPostInfo());
      dispatch(getUkrPostInfo());
    }
  }, [isAuth]);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_APP_CLIENT_ID}>
      <div>
        <Header />
        {width <= 991.98 && isBurgerMenuOpen && <BurgerMenu />}
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='*' element={<PageNotFound />} />
          {isAuth && <Route path='/account/*' element={<UserPanelRoutes />} />}
          {isAuth && hasStore && (
            <Route path='/account/store/*' element={<StorePanelRoutes />} />
          )}
          {isAuth && hasStore && (
            <Route path='/account/new-product' element={<ProductAddPage />} />
          )}
          <Route path='/store/:id' element={<StorePage />} />
        </Routes>
      </div>
    </GoogleOAuthProvider>
  );
};
