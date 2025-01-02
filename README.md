# Chatbot-admin

## client

### 1. stack

- 라이브러리(프레임워크): [react](https://react.dev/)
- 스타일링 & UI: [tailwindCSS](https://tailwindcss.com/) & [shadcn](https://ui.shadcn.com/)
- 라우팅: [react-router](https://reactrouter.com/)
- 전역 상태 관리: [zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)
- 서버 상태 관리: [tanstack-query](https://tanstack.com/query/latest)

### 2. main function

- 상담사용 admin 기능을 위한 모의 UI
- 목 토큰을 통한 인증과 라우트 보호
- 서버 데이터를 활용한 UI 인터랙션

### 3. structure

#### - app

```
App
  ┗ ContextProvider
    ┗ Route
      {/* Public routes */}
        ┗ LoginForm

      {/* Protected routes */}
        ┗ Dashboard
        ┗ Analytics
```

#### - folder

```
src/
├── components/         # UI 컴포넌트(컨테이너)
│   ├── ui/             # shadcn UI 기본
│   ├── common/         # 공통
│   │    └── Header / QueryStateHandler(Loader, Error)
│   └── features/       # 기능별
│
├── routes/             # 라우팅 설정
│
├── pages/              # 페이지 컴포넌트
│
├── stores/             # 전역 상태 관리
│   └─── useAuthStore
│
├── hooks/              # 커스텀 훅(비즈니스 로직)
│
├── types/              # 타입 정의
│
└── lib/                # 유틸리티 및 설정
    └── utils/          # 유틸 함수
    └── const/          # 상수
```

- container(`UI`) / presenter(`Logic`) 디자인 패턴을 따름
- 비즈니스 로직은 zustand의 액션 함수와 hooks으로 처리
  - `store/useAuthStore`: 인증을 위한 **1회성 데이터** 사용 + 인증 상태 전역 관리
  - `hooks(tanstack-query)`: UI 업데이트를 위한 다회성 데이터 사용 + 서버 데이터 **캐싱**

## server

- mock db: [json-server](https://www.npmjs.com/package/json-server)
