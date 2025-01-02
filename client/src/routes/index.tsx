import { BrowserRouter, Routes, Route } from 'react-router';

import { RootLayout, ProtectedLayout } from '@/layouts';
import { Dashboard, Analytics } from '@/pages';

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>

        {/* Public routes */}
        <Route element={<RootLayout />}>

          {/* Protected routes */}
          <Route element={<ProtectedLayout />}>
            <Route index element={<Dashboard />} />
            <Route path='analytics' element={<Analytics />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;

