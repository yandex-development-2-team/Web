import { useEffect, useRef, useState } from 'react';
import { showNotification } from '@/services/notification.service';
import { cn } from '@/utils';
import UploadIcon from '@/assets/icons/upload-32.svg?react'; // иконка загрузки
import uploadPlaceholder from '@/assets/images/AddEmployee.jpg'; // иконка крестика (добавь в assets, если нет)

type Props = {
  value?: File;
  onChange: (file?: File) => void;
  className?: string;
};

export function UploadPhoto({ value, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // Синхронизация preview при изменении value извне
  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value);
      setPreview(url);
      return () => URL.revokeObjectURL(url);
    }
    setPreview(null);
  }, [value]);

  const handleSelect = (file?: File) => {
    if (!file) return;

    // Валидация типа
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      showNotification({
        type: 'error',
        message: 'Поддерживаются только PNG или JPG файлы',
      });
      return;
    }

    // Валидация размера (5 МБ)
    if (file.size > 5 * 1024 * 1024) {
      showNotification({
        type: 'error',
        message: 'Файл слишком большой. Максимум 5 МБ',
      });
      return;
    }

    onChange(file);
  };

  return (
    <div className={cn('m-auto flex items-center border-b-1 mb-17 pb-2 border-background', className)}>
      {/* Иконка upload по центру */}
  
      {/* Зона предпросмотра + загрузки — круглый контейнер */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Загрузить или изменить фото"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={cn(
          'group relative h-36 w-36 rounded-full p-1.5',
          'border-accent cursor-pointer border-1',
          'hover:border-primary/70 transition-all duration-300 hover:shadow-lg',
          'focus:ring-ring focus:outline-none',
        )}
      >
        {/* Фоновая картинка — всегда растягивается на весь контейнер */}
        <div className="relative h-full w-full overflow-hidden rounded-full">
          {preview ? (
            <img
              src={preview}
              alt="Предпросмотр загруженного фото"
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pt-4 pr-1">
              <img src={uploadPlaceholder} className=" brightness-60
    contrast-170
    saturate-105"
    
     />
            </div>
          )}

           {/* 2️⃣ Затемнение */}
  <div
  className="
  absolute inset-0
  backdrop-brightness-175
  bg-black/40
  
  "
  />
        </div>

        

        {/* Затемнение при наведении */}
        <div className="absolute inset-1 z-10 rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />

      {/* Иконка upload по центру */}
  {/* Иконка всегда по центру, контейнер с запасом */}
<div className="absolute inset-0 flex items-center justify-center z-30 pointer-events-none">
  <UploadIcon
    className={cn(
      ' text-white/90 transition-all duration-300',
      preview ? 'group-hover:scale-110 group-hover:text-white' : 'scale-100'
    )}
  />
</div>
      </div>

      {/* Скрытый input для выбора файла */}
      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleSelect(file);
          e.target.value = ''; // сброс, чтобы можно было выбрать тот же файл повторно
        }}
      />
    </div>
  );
}
