import { useEffect, useRef, useState } from 'react'
import { showNotification } from '@/services/notification.service'
import { cn } from '@/utils'
import uploadIcon from '@/assets/icons/upload-32.svg'          // иконка загрузки
import uploadPlaceholder from '@/assets/images/AddEmployee.jpg'         // иконка крестика (добавь в assets, если нет)

type Props = {
  value?: File
  onChange: (file?: File) => void
  className?: string
}

export function UploadPhoto({ value, onChange, className }: Props) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [preview, setPreview] = useState<string | null>(null)

  // Синхронизация preview при изменении value извне
  useEffect(() => {
    if (value) {
      const url = URL.createObjectURL(value)
      setPreview(url)
      return () => URL.revokeObjectURL(url)
    }
    setPreview(null)
  }, [value])

  const handleSelect = (file?: File) => {
    if (!file) return

    // Валидация типа
    if (!['image/png', 'image/jpeg', 'image/jpg'].includes(file.type)) {
      showNotification({
        type: 'error',
        message: 'Поддерживаются только PNG или JPG файлы',
      })
      return
    }

    // Валидация размера (5 МБ)
    if (file.size > 5 * 1024 * 1024) {
      showNotification({
        type: 'error',
        message: 'Файл слишком большой. Максимум 5 МБ',
      })
      return
    }

    onChange(file)
  }

  return (
    <div className={cn('flex items-center gap-6 m-auto', className)}>
      {/* Зона предпросмотра + загрузки — круглый контейнер */}
      <div
        role="button"
        tabIndex={0}
        aria-label="Загрузить или изменить фото"
        onClick={() => inputRef.current?.click()}
        onKeyDown={(e) => e.key === 'Enter' && inputRef.current?.click()}
        className={cn(
          'group relative w-36 h-36 rounded-full overflow-hidden',
          'border-2 border-accent/50 cursor-pointer',
          'transition-all duration-300 hover:border-primary/70 hover:shadow-lg',
          'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
        )}
      >
        {/* Фоновая картинка — всегда растягивается на весь контейнер */}
        <div className="absolute inset-0">
          {preview ? (
            <img
              src={preview}
              alt="Предпросмотр загруженного фото"
              className="absolute inset-0 w-full object-contain transition-transform duration-500 group-hover:scale-110"
            />
          ) : (
            <div className="absolute inset-0 bg-muted/30 flex items-center justify-center">
              <img
                src={uploadPlaceholder}
                alt="Заглушка"
                className="w-20 h-20 object-contain opacity-70"
              />
            </div>
          )}
        </div>
  
        {/* Затемнение при наведении */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-60 transition-opacity duration-300 z-10" />
  
        {/* Иконка upload — всегда по центру, поверх всего */}
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <img
            src={uploadIcon}
            alt="Загрузить/изменить фото"
            className={cn(
              'w-10 h-10 transition-all duration-300',
              preview
                ? 'opacity-70 group-hover:opacity-100 group-hover:scale-110'
                : 'opacity-80 group-hover:scale-110'
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
          const file = e.target.files?.[0]
          if (file) handleSelect(file)
          e.target.value = '' // сброс, чтобы можно было выбрать тот же файл повторно
        }}
      />
    </div>
  )}