import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import AppRoutes from './AppRoutes.tsx';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.tsx';
import { Provider } from 'react-redux';
import { store } from '@src/store';

const container = document.getElementById('root');
container?.classList.add('w-full');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <Provider store={store}>
          <AppRoutes />
        </Provider>
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
