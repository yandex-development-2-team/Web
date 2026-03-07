import { api } from '@/services/api.service';

export async function downloadFileService(
  id: string | number,
  path: string,
  onProgress?: (percent: number) => void,
  signal?: AbortSignal,
): Promise<Blob> {
  const { data } = await api.get(`${path}/${id}`, {
    responseType: 'blob',
    signal,
    onDownloadProgress: (progressEvent) => {
      if (progressEvent.total) {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress?.(percent);
      }
    },
  });

  return data;
}
