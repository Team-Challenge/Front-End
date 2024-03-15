import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppSelector } from '@/hooks/reduxHook';
import {
  Orders,
  Products,
  Messages,
  Reviews,
  StoreManagement,
  StorePage,
} from '@/pages';
import { StorePanelNav } from '../dashboardNav/StorePanelNav';

export const StorePanelRoutes = () => {
  const { linkToStore } = useAppSelector((state) => state.storeProfile);

  return (
    <main>
      <div className='container user-panel-page'>
        <StorePanelNav />
        <Routes>
          <Route path='products' element={<Products />} />
          <Route path='settings' element={<StoreManagement />} />
          <Route path='orders' element={<Orders />} />
          <Route path='messages' element={<Messages />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path={`/store/${linkToStore}`} element={<StorePage />} />
          <Route path='*' element={<Navigate to='products' />} />
        </Routes>
      </div>
    </main>
  );
};
