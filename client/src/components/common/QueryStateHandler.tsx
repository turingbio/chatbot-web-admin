interface FetchError {
  message: string;
}

/**
 * query 함수의 loading, error 처리용 컴포넌트
 * 하단에 Loader / Error UI 정의
 */
const QueryStateHandler = ({
  isLoading,
  error,
  children
}: {
  isLoading: boolean;
  error: FetchError | null;
  children: React.ReactNode;
}) => {
  if (isLoading) {
    return (
      <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-[calc(100vh-64px)] md:h-[calc(100vh-80px)] items-center justify-center">
        <Error />
      </div>
    );
  }

  return <>{children}</>;
};

const Loader: React.FC = () => {
  return (
    <div>Loading....</div>
  )
}

const Error: React.FC = () => {
  return (
    <div>Error</div>
  )
}

export default QueryStateHandler
