import { useRef, type HTMLAttributes } from 'react';
import { cn } from '@/utils';
import { Button } from '@/components/ui/Button';
import { PlusIcon } from '@/assets/icons';
import { Input } from '@/components/ui/Input';

type VariantDirectionType = 'box' | 'specProduct';

const VARIANTS_VIEW = {
  box: 'box',
  specProduct: 'specProduct',
} as const;

interface Image2PickerProps extends HTMLAttributes<HTMLInputElement> {
  previewUrl: string | null;
  variantView?: VariantDirectionType;
}

export function ImagePicker({
  previewUrl,
  variantView = VARIANTS_VIEW.box,
  ...fieldProps
}: Image2PickerProps) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <div
      className={cn(
        'bg-background border-border min-h-23.5 rounded-lg border p-2',
        'col-span-2 grid justify-items-center',
        {
          ['grid-rows-[172px_1fr] gap-3']:
            previewUrl && variantView === VARIANTS_VIEW.specProduct,
          ['grid-cols-2 gap-3']:
            previewUrl && variantView === VARIANTS_VIEW.box,
          ['bg-card border-transparent']: previewUrl,
        },
      )}
    >
      {previewUrl && (
        <div
          className={cn({
            ['min-h-23 max-w-63 overflow-hidden object-cover']:
              variantView === VARIANTS_VIEW.specProduct,
          })}
        >
          <img src={previewUrl} alt="preview" className="h-full w-full" />
        </div>
      )}
      <div
        className={cn(
          'flex items-center gap-3',
          'spec-empty-col box-empty-row',
          'spec-preview-row box-preview-row',
          {
            ['justify-self-start']:
              previewUrl && variantView === VARIANTS_VIEW.box,
            ['flex-col-reverse']:
              variantView === VARIANTS_VIEW.specProduct && !previewUrl,
          },
        )}
      >
        <Button
          type="button"
          size={'icon-lg'}
          className="relative"
          onClick={() => inputRef.current?.click()}
        >
          <PlusIcon />
          <div className="absolute">
            <Input
              type="file"
              hidden
              ref={inputRef}
              accept="image/jpeg, image/png, image/webp"
              {...fieldProps}
            />
          </div>
        </Button>
        <div className={cn('text-[14px]')}>
          {!previewUrl
            ? 'Загрузить изображение'
            : 'Загрузить другое изображение'}
        </div>
      </div>
    </div>
  );
}
