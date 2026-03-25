import { api } from './api.service';

export const getBoxPopularity = async (from: string, to: string) => {
  const { data } = await api.get('box-popularity/', {
    params: { from, to },
  });

  return data;
};
