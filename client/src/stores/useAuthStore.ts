import { create, StateCreator } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { axiosInstance, handleAxiosError } from '@/lib/axios';
import { ENDPOINTS } from '@/lib/const';

// 상태 타입 정의
interface Account {
  id: string; 
  email: string;
  name: string;
}

interface AuthState {
  token: string | null;
  counselor: Account | null;
  isAuthenticated: boolean;
  errorMessage: string | null;
  login: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  logout: () => void;
}

type AuthStorePersist = (
  config: StateCreator<AuthState>,
  options: PersistOptions<AuthState>
) => StateCreator<AuthState>;

// store persist 사용
const authStorePersist = persist as AuthStorePersist;

export const useAuthStore = create<AuthState>()(
  authStorePersist(
    (set) => ({
      token: null,
      counselor: null,
      isAuthenticated: false,
      errorMessage: null,

      login: async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        try {
          set({ errorMessage: null });
          
          const formData = new FormData(e.currentTarget);
          const email = formData.get('email') as string;
          const password = formData.get('password') as string;

          if (!email || !password) {
            set({ errorMessage: '이메일과 비밀번호를 입력해주세요.' });
            return;
          }

          const { data: authData } = await axiosInstance.get(ENDPOINTS.AUTH);

          if (authData.email !== email || authData.password !== password) {
            set({ errorMessage: '이메일 또는 비밀번호가 올바르지 않습니다.' });
            return;
          }

          const { data: counselors } = await axiosInstance.get(ENDPOINTS.COUNSELORS);
          const counselor = counselors[authData.counselorId];

          set({
            isAuthenticated: true,
            errorMessage: null,
            counselor: {
              id: authData.counselorId,
              name: counselor.name,
              email: authData.email,
            },
            token: authData.token
          });
        } catch (error) {
          console.error('Login error:', error);
          
          set({ 
            errorMessage: handleAxiosError({error, message: '로그인 중 오류가 발생했습니다.'}),
            isAuthenticated: false 
          });
        }
      },

      logout: () => {
        set({
          token: null,
          counselor: null,
          isAuthenticated: false,
          errorMessage: null,
        });
      },
    }),
    {
      name: 'auth-storage',
    }
  )
);