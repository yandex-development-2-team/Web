import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router';
import { router } from '@/app/router';
import '@/styles/globals.css';
import App from '@/App';
import { NotificationToaster } from '@/components/common/NotificationToaster';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <NotificationToaster />
    <App />
    <RouterProvider router={router} />
  </StrictMode>,
);
