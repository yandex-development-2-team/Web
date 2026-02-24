import { useRef, useState } from 'react'
import { showNotification } from '@/services/notification.service'

type Props = {
  value?: File
  onChange: (file?: File) => void
}

export function UploadPhoto({ value: _value, onChange }: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [preview, setPreview] = useState<string | null>(null)

  const handleSelect = (file: File) => {
    if (!['image/png', 'image/jpeg'].includes(file.type)) {
      showNotification({
        type: 'error',
        message: 'Поддерживаются только PNG или JPG',
      })
      return
    }

    if (file.size > 5 * 1024 * 1024) {
      showNotification({
        type: 'error',
        message: 'Файл слишком большой (макс. 5MB)',
      })
      return
    }

    setPreview(URL.createObjectURL(file))
    onChange(file)
  }

  return (
    <div className="flex items-center gap-6">
      <div
        className="w-32 h-32 rounded-lg border border-dashed flex items-center justify-center cursor-pointer bg-muted"
        onClick={() => inputRef.current?.click()}
      >
        {preview ? (
          <img src={preview} alt="" className="w-full h-full object-cover rounded-lg" />
        ) : (
          <span className="text-sm text-muted-foreground">Загрузить фото</span>
        )}
      </div>

      <input
        ref={inputRef}
        type="file"
        accept="image/png, image/jpeg"
        className="hidden"
        onChange={e => {
          const file = e.target.files?.[0]
          if (file) handleSelect(file)
        }}
      />
    </div>
  )
}
