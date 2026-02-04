import { cn } from '@/utils';
import Button from './components/ui/Button';
import Input from './components/ui/Input';
import Textarea from './components/ui/Textarea';

function App() {
  return (
    <div className="p-5">
      <h1 className={cn('text-brand mb-4 bg-violet-300')}>
        Админ панель. Яндекс развитие Проверка тестовых компонентов
        <Button onClick={() => console.log('Тестовая кнопка')}>
          Тестовая кнопка
        </Button>
        <hr />
        <Input onChange={() => console.log('Тестовый инпут')} />
        <hr />
        <Textarea onChange={() => console.log('Тестовый TextArea')} />
      </h1>
    </div>
  );
}

export default App;
