export const BASE_URL = 'http://localhost:3001';

export const ENDPOINTS = {
  AUTH: '/auth',
  COUNSELORS: '/counselors',
  ALARMS: '/alarms'
  
  // TODO: 실제 backend 서버 구축시 다른 엔드포인트들을 객체 형태로 추가
} as const;