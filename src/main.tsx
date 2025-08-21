import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import '@src/index.css';
import App from '@components/App/App.tsx';

const container = document.getElementById('root');
container?.classList.add('w-full');

if (!container) {
  throw new Error('Root element not found');
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>
);
