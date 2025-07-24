import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router';
import './index.css';
import App from './components/app/App.tsx';
import ErrorBoundary from '@components/ErrorBoundary/ErrorBoundary.tsx';

const container = document.getElementById('root');
container?.classList.add('w-full');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <ErrorBoundary>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ErrorBoundary>
  </StrictMode>
);
