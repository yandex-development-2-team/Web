import { cn } from '@/utils';
import { showNotification } from '@/services/notification.service';

function App() {
  const handelSuccess = () =>
    showNotification({
      message: 'Успех',
      type: 'success',
      duration: 4000,
    });
  const handelError = () =>
    showNotification({
      message: 'Ошибка!',
      type: 'error',
    });
  const handelInfo = () =>
    showNotification({
      message: 'Информация',
      type: 'info',
      duration: 5000,
    });

  return (
    <div className="p-5">
      <h1 className={cn('text-brand mb-4 bg-violet-300')}>
        Админ панель. Яндекс развитие
      </h1>
      {/* это блок для показа работы уведомлений, можно удалять */}
      <div className={cn('flex gap-5')}>
        <button onClick={handelSuccess}>success</button>
        <button onClick={handelError}>error</button>
        <button onClick={handelInfo}>info</button>
      </div>
    </div>
  );
}

export default App;
