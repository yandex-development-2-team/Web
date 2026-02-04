import { Toaster } from 'sonner';

export function NotificationProvider() {
  return (
    <Toaster
      position="bottom-left"
      expand={false}
      richColors
      closeButton
      visibleToasts={3}
    />
  );
}
