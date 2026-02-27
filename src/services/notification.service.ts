import { toast } from 'sonner';

type NotificationType = 'success' | 'error' | 'info';

const notificationCustomConfig = {
  success: {
    style: {
      background: 'var(--in-work)',
      border: '1px solid var(--in-work-foreground)',
      color: 'var(--foreground)',
    },
  },
  error: {
    style: {
      background: 'var(--destructive-light)',
      border: '1px solid var(--destructive)',
      color: 'var(--foreground)',
    },
  },
  info: {
    style: {
      background: 'var(--completed)',
      border: '1px solid var(--completed-foreground)',
      color: 'var(--foreground)',
    },
  },
};

type NotificationOptions = {
  message: React.ReactNode;
  type: NotificationType;
  duration?: number;
};

export const showNotification = ({
  message,
  type = 'info',
  duration = 3000,
}: NotificationOptions) => {
  const config = notificationCustomConfig[type];
  return toast[type](message, { ...config, duration });
};
