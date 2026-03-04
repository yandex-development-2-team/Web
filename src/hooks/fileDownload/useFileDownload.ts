import { downloadFileService } from '@/services/downloadFile.service';
import { showNotification } from '@/services/notification.service';
import { saveBlobAsFile } from '@/utils/saveBlobFile';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRef, useState } from 'react';

interface DownloadParams {
  id: string | number;
  fileName?: string;
  path?: string;
}

export function useFileDownload() {
  const [progress, setProgress] = useState(0);
  const abortControllerRef = useRef<AbortController | null>(null);

  const mutation = useMutation({
    mutationFn: async ({ id, path = '/files', fileName }: DownloadParams) => {
      const controller = new AbortController();

      const blob = await downloadFileService(
        id,
        path,
        (p) => setProgress(p),
        controller.signal,
      );

      saveBlobAsFile(blob, fileName || `document-${id}.pdf`);
    },
    onSuccess: () => {
      showNotification({ type: 'success', message: 'Файл скачан!' });
    },
    onError: (error) => {
      if (axios.isCancel(error)) {
        return;
      }

      showNotification({ type: 'error', message: 'Ошибка скачивания' });
    },
    onSettled: () => {
      setProgress(0);
      abortControllerRef.current = null;
    },
  });

  const cancelDownload = () => {
    abortControllerRef.current?.abort();
    mutation.reset();
  };

  return {
    handleDownload: mutation.mutate,
    isRunning: mutation.isPending,
    progress,
    cancelDownload,
  };
}
