import { cn } from '@/utils/utils';
import { Button } from '@/components/button';

function App() {
  const handleClick = () => console.log('click btn');

  return (
    <div className="p-5">
      <h1 className={cn('text-brand mb-4 bg-violet-300')}>
        Админ панель. Яндекс развитие
      </h1>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

export default App;
