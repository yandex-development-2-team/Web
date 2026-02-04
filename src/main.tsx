import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/globals.css';
import App from '@/App';
import { NotificationProvider } from '@/app/providers';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationProvider />
    <App />
  </StrictMode>,
);
