export interface Alarm {
  id: string;
  createdAt: string;
  type: AlarmType;
  title: string;
  detail: string;
  status: AlarmStatus;
  userId?: string; 
}

// 알람 종류
type AlarmType =
  | 'NEW'              // 새 상담 요청
  | 'ACCEPTED'         // 상담 수락
  | 'REJECTED'         // 상담 거절
  | 'COUNSEL_STARTED'  // 상담 시작
  | 'COUNSEL_ENDED'    // 상담 종료
  | 'SYSTEM_NOTICE'    // 시스템 공지

// 알람 처리 상태
export type AlarmStatus = 
  | 'READ'             // 읽음
  | 'UNREAD'           // 안 읽음
