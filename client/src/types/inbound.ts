type InboundStatus = '신규' | '매칭중' | '상담진행중' | '완료';
type ProblemCategory = '우울' | '불안' | '가족' | '학업' | '대인관계';

export interface Inbound {
  id: string;
  name: string;
  clientId: string;
  status: InboundStatus;
  requestDate: string;
  problemCategory: ProblemCategory;
}
