import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import Router from './routes';

/**
 * Application = ContextProvider ▶ Router 구조
 */
function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  );
}

export default App;
