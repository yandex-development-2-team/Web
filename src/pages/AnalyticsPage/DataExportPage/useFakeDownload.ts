import { showNotification } from '@/services/notification.service';
import { useState } from 'react';

export function useFakeDownload(delayTik: number = 200) {
  const [progress, setProgress] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [timer, setTimer] = useState<number | null>(null);

  const handleUpload = () => {
    if (isRunning) return;

    setIsRunning(true);
    setProgress(0);

    const newTimer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;

        if (next >= 100) {
          clearInterval(newTimer);
          setTimeout(() => {
            setIsRunning(false);
            setProgress(0);
            showNotification({ message: 'Файл загружен', type: 'success' });
          }, 1000);
          return 100;
        }
        return next;
      });
    }, delayTik);

    setTimer(newTimer);
  };

  const handleStop = () => {
    if (timer) {
      clearInterval(timer);
      setIsRunning(false);
      setProgress(0);
      setTimer(null);
    }
  };

  return { handleStop, handleUpload, progress, isRunning };
}
