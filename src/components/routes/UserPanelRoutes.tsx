import { Navigate, Route, Routes } from 'react-router-dom';
import { useWindowDimensions } from '@/hooks/useWindowDimensions';
import {
  Profile,
  Purchases,
  FavoriteProducts,
  Messages,
  Store,
  Settings,
} from '@/pages';
import { UserPanel } from '../sidebarNav/UserPanel';

export const UserPanelRoutes = () => {
  const { width } = useWindowDimensions();

  return (
    <main>
      <div className='container user-panel-page'>
        {width >= 991.98 && <UserPanel />}
        <Routes>
          <Route path='profile' element={<Profile />} />
          <Route path='purchases' element={<Purchases />} />
          <Route path='wishlist' element={<FavoriteProducts />} />
          <Route path='messages' element={<Messages />} />
          <Route path='create-store' element={<Store />} />
          <Route path='settings' element={<Settings />} />
          <Route path='*' element={<Navigate to='profile' />} />
        </Routes>
      </div>
    </main>
  );
};
