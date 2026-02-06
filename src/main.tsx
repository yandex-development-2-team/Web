import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import '@/styles/globals.css';
import App from '@/App';
import { NotificationToaster } from '@/components/common/NotificationToaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationToaster />
    <App />
  </StrictMode>,
);
