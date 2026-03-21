import { useEffect, useRef } from 'react';
import { showNotification } from '@/services/notification.service';
import { cn } from '@/utils';
import { UploadIcon } from './index';
import uploadPlaceholder from '@/assets/images/AddEmployee.jpg';

type Props = {
  value?: File;
  onChange: (file?: File) => void;
  className?: string;
};

export function UploadPhoto({ value, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const preview = value ? URL.createObjectURL(value) : null;

  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview);
      }
    };
  }, [preview]);

  const handleSelect = (file?: File) => {
    if (!file) return;

    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      showNotification({
        type: 'error',
        message: 'Поддерживаются только PNG или JPG файлы',
      });
      return;
    }

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
    <div
      className={cn(
        'border-background m-auto flex items-center border-b-1 pb-2',
        className,
      )}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label="Загрузить или изменить фото"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={cn(
          'group relative aspect-square w-36 rounded-full p-1.5',
          'border-accent cursor-pointer border-1',
          'hover:border-primary/70 transition-all duration-300 hover:shadow-lg',
          'focus:ring-ring focus:outline-none',
        )}
      >
        <div className="relative h-full w-full overflow-hidden rounded-full">
          {preview ? (
            <div className="absolute inset-0 flex items-center justify-center pt-4 pr-1">
              <img
                src={preview}
                alt="Предпросмотр загруженного фото"
                className="brightness-60 contrast-170 saturate-105"
              />
            </div>
          ) : (
            <div className="absolute inset-0 flex items-center justify-center pt-4 pr-1">
              <img
                src={uploadPlaceholder}
                className="brightness-60 contrast-170 saturate-105"
              />
            </div>
          )}

          <div className="absolute inset-0 bg-black/40 backdrop-brightness-175" />
        </div>

        <div className="absolute inset-1 z-10 rounded-full bg-black/40 opacity-0 transition-opacity duration-300 group-hover:opacity-60" />

        <div className="pointer-events-none absolute inset-0 z-30 flex items-center justify-center">
          <UploadIcon
            className={cn(
              'text-white/90 transition-all duration-300',
              preview
                ? 'group-hover:scale-110 group-hover:text-white'
                : 'scale-100',
            )}
          />
        </div>
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png,image/jpeg,image/jpg"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleSelect(file);
          e.target.value = '';
        }}
      />
    </div>
  );
}
