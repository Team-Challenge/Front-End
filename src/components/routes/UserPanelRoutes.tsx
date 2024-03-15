import { Navigate, Route, Routes } from 'react-router-dom';
import {
  Profile,
  Purchases,
  FavoriteProducts,
  Messages,
  Store,
  Settings,
} from '@/pages';
import { UserPanelNav } from '../dashboardNav/UserPanelNav';

export const UserPanelRoutes = () => {
  return (
    <main>
      <div className='container user-panel-page'>
        <UserPanelNav />
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
