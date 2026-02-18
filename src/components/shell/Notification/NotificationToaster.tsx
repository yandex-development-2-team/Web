import { Toaster } from 'sonner';

export function NotificationToaster() {
  return (
    <Toaster
      position="bottom-left"
      expand={false}
      closeButton
      visibleToasts={3}
    />
  );
}
