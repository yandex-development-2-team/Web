import { api } from './api.service';

export const fetchFileList = async () => {
  const response = await api.get('/api/vi/files');
  return response.data;
};

export const uploadFile = async (file: File) => {
  const formData = new FormData();
  formData.append('file', file); // Ключ 'file' должен совпадать с тем, что ждет бэкенд
  const response = await api.post('/api/upload', formData);

  return response.data;
};
