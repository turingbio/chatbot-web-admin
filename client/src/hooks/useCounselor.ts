import { useQuery,useMutation, useQueryClient, UseQueryResult } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/useAuthStore';
import { axiosInstance } from '@/lib/axios';
import { queryKey } from '@/lib/const/queryKey'; 
import { ENDPOINTS } from '@/lib/const';
import { Counselor, CounselorSettings } from '@/types';

/**
 * 토큰으로 카운슬러 정보 가져오기(GET)
 */
export const useCounselor = (): UseQueryResult<Counselor, Error> => { 
  return useQuery({
    queryKey: queryKey.counselor,
    queryFn: async () => {
      const { token, counselor: user } = useAuthStore.getState();
      if (!token) throw new Error('인증 토큰이 없습니다.');
      if (!user) throw new Error('사용자 정보가 없습니다.');

      const { data: counselors } = await axiosInstance.get(ENDPOINTS.COUNSELORS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const counselor = counselors[user.id];

      return counselor;
    }
  });
};

/**
 * 토큰으로 카운슬러 세팅 정보 수정(MUTATION)
 */
export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  const counselorId = useAuthStore(state => state.counselor!.id);

  return useMutation({
    mutationFn: async (settings: CounselorSettings) => {
      const { token } = useAuthStore.getState();
      
      const { data: counselors } = await axiosInstance.get(ENDPOINTS.COUNSELORS, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const updatedCounselor = {
        ...counselors[counselorId],
        settings
      };

      const { data } = await axiosInstance.patch(
        ENDPOINTS.COUNSELORS, 
        { [counselorId]: updatedCounselor },
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );

      return data[counselorId];
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKey.counselor });
    }
  });
};

/**
 * 토큰으로 카운슬러 알람 목록 가져오기(실시간 업데이트 기능 구현 X)
 */
export const useCounselorAlarms = () => {
  return useQuery({
    queryKey: queryKey.alarms,
    queryFn: async () => {
      const { token, counselor: user } = useAuthStore.getState();
      if (!token) throw new Error('인증 토큰이 없습니다.');
      if (!user) throw new Error('사용자 정보가 없습니다.');


      const { data } = await axiosInstance.get(ENDPOINTS.ALARMS, {
        headers: { Authorization: `Bearer ${token}` }
      });
      const alarms = data[user.id];

      return alarms || [];
    }
  });
};