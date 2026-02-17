import { Outlet } from 'react-router';
import { cn } from '@/utils';

function App() {
  return (
    <div className={cn('h-full p-5')}>
      <Outlet />
    </div>
  );
}

export default App;
