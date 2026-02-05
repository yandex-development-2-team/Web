import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import '@/styles/globals.css';
import App from '@/App';
import { Toaster } from 'sonner';
import { store } from '@/store';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <App />
      <Toaster richColors position="top-right" />
    </Provider>
  </StrictMode>,
);
