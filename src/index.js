import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));

// RQ 클라이언트 선언 및 옵션설정
export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 0,
      useErrorBoundary: true,
      refetchOnWindowFocus: false,
      staleTime: Infinity,
      cacheTime: Infinity,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
})

root.render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen='true' />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </QueryClientProvider>
);