import { cn } from '@/utils';
import { Link, Outlet } from 'react-router';
import { href, ROUTES } from '@/assets/app/router/routes';

function App() {
  return (
    <div className="p-5">
      <h1 className={cn('text-brand mb-4 bg-violet-300')}>
        Админ панель. Яндекс развитие
      </h1>

      <Link to={ROUTES.BOX_SOLUTIONS}>К списку коробочных решений</Link>

      <Link to={href(ROUTES.BOX_DETAILS, { boxId: '123' })}>
        К деталям коробки 123 (с параметром)
      </Link>
      <Outlet />
    </div>
  );
}

export default App;
