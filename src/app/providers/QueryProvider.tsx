import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from './QueryClientProvider'

export const Providers = ({ children }: { children: React.ReactNode }) => (
  <QueryClientProvider client={queryClient}>
    {children}
  </QueryClientProvider>
)