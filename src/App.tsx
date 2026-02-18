import { Outlet } from 'react-router';
import { cn } from '@/utils';
import { Calendar } from './components/common/Calendar';

function App() {
  return (
    <div className="p-5">
      <h1 className={cn('text-brand mb-4 bg-violet-300')}>
        Админ панель. Яндекс развитие
      </h1>
      <Outlet />

      <Calendar mode='single'/>

    </div>
  );
}

export default App;
