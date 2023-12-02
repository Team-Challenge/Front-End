import { Navigate, Route, Routes } from 'react-router-dom';
import { StorePanel } from '../sidebarNav/StorePanel';
import { Orders, Products, Messages, Reviews, StoreManagement } from '@/pages';

export const StorePanelRoutes = () => {
  return (
    <main>
      <div className='container user-panel-page'>
        <StorePanel />
        <Routes>
          <Route path='products' element={<Products />} />
          <Route path='settings' element={<StoreManagement />} />
          <Route path='orders' element={<Orders />} />
          <Route path='messages' element={<Messages />} />
          <Route path='reviews' element={<Reviews />} />
          <Route path='*' element={<Navigate to='products' />} />
        </Routes>
      </div>
    </main>
  );
};
