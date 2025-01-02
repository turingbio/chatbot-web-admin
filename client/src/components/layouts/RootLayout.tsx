import { Outlet } from 'react-router';

import { Header } from '@/components';

/**
 * 공통 컴포넌트 + Outlet을 통한 중첩 라우트 렌더링
 */
const RootLayout = () => {
  return (
    <div className='min-h-screen bg-[#F0F5F9]'>
      <Header />
      <main className='max-w-8xl mx-auto'>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;
