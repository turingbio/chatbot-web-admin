import { Outlet } from 'react-router';
import { useAuthStore } from '@/stores/useAuthStore';
import { LoginForm } from '@/components';

/**
 * 로그인 여부(isAuthenticated)에 따른 조건부 렌더링
 */
const ProtectedLayout = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    !isAuthenticated ? <LoginForm /> : <Outlet />
  )
};

export default ProtectedLayout;
