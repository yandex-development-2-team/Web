import { toast } from 'sonner';

type NotificationType = 'success' | 'error' | 'info';

const notificationCustomConfig = {
  success: {
    style: {
      background: '#f0fdf4',
      border: '1px solid #bbf7d0',
      color: '#166534',
    },
  },
  error: {
    style: {
      background: '#fef2f2',
      border: '1px solid #fecaca',
      color: '#991b1b',
    },
  },
  info: {
    style: {
      background: '#eff6ff',
      border: '1px solid #bfdbfe',
      color: '#1e40af',
    },
  },
};

type NotificationOptions = {
  message: React.ReactNode;
  type: NotificationType;
  duration?: number;
};

export function useNotification() {
  const showNotification = ({
    message,
    type = 'info',
    duration = 3000,
  }: NotificationOptions) => {
    const config = notificationCustomConfig[type];

    const toastOptions = {
      ...config,
      duration,
    };

    switch (type) {
      case 'success':
        return toast.success(message, {
          ...toastOptions,
        });
      case 'error':
        return toast.error(message, {
          ...toastOptions,
        });
      case 'info':
        return toast.info(message, {
          ...toastOptions,
        });

      default:
        return toast.info(message, {
          ...toastOptions,
        });
    }
  };

  return {
    showNotification,
  };
}
