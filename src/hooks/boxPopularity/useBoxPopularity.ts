import { useQuery } from '@tanstack/react-query';
import { getBoxPopularity } from '@/services/boxPopularity.service';

export const useBoxPopularity = (from?: string, to?: string) => {
  return useQuery({
    queryKey: ['box-popularity', from, to],
    queryFn: () => getBoxPopularity(from!, to!),
    enabled: false,
    staleTime: 1000 * 60 * 30,
  });
};
