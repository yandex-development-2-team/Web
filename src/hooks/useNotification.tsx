import { toast } from 'sonner';

// для примера кастомизации. можно удалить
import { AlarmCheckIcon } from 'lucide-react';

type NotificationType = 'success' | 'error' | 'info';

// можно использовать кастомные стили так или через toastOptions в NotificationProvider
const notificationCustomConfig = {
  success: {
    icon: <AlarmCheckIcon />,
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

  // для автоматическокго управления уведомлениями, при разных состояних промиса
  const promise = toast.promise;
  // для ручного управления уведомленями во время загрузки
  const loading = toast.loading;
  // для ручного закрытия уведомлений
  const dismiss = toast.dismiss;

  return {
    showNotification,
    promise,
    loading,
    dismiss,
  };
}
