import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';
import { SwitchItem } from '@/components/ui/Switch';
import { Modal } from './Modal';
import { Button } from '@/components/ui/Button';
import { usePreview } from '@/hooks';
import { PlusIcon } from '@/assets/icons';

interface IFormValues {
  title: string;
  isActive: boolean;
  description: string;
  image: File | null;
}

interface CreateProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreateProjectModal({
  isOpen,
  onClose,
}: CreateProjectModalProps) {
  const { control, handleSubmit } = useForm<IFormValues>({
    defaultValues: {
      title: '',
      isActive: true,
      description: '',
      image: null,
    },
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { handleFileChange, previewUrl } = usePreview();

  const onSubmit = (data: IFormValues) => data;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Создать спецпроект"
      footer={{
        variant: 'cancel-save',
        onSave: () => submitBtnRef.current?.click(),
      }}
    >
      <form
        id="my-form-id"
        className={cn('flex flex-col gap-4 px-6')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={cn('grid grid-cols-[371px_auto] items-center')}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              return <Input {...field} label="Заголовок" placeholder="Текст" />;
            }}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => {
              return (
                <SwitchItem
                  {...field}
                  label="Активен"
                  className="flex flex-row-reverse"
                />
              );
            }}
          />
        </div>
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return <Input {...field} label="Описание" placeholder="Текст" />;
          }}
        />

        <div
          className={cn('grid items-center gap-3 transition-all duration-300', {
            ['grid-rows-[172px_1fr] justify-center']: previewUrl?.length,
            ['grid-cols-1']: !previewUrl?.length,
          })}
        >
          {previewUrl?.length && (
            <div
              className={cn('relative max-w-65.5 overflow-hidden object-cover')}
            >
              <img src={previewUrl} alt="preview" />
            </div>
          )}
          <div
            className={cn('flex items-center justify-center rounded-lg', {
              ['bg-card justify-center pl-0']: previewUrl?.length,
              ['bg-background border-border h-23.5 border']:
                !previewUrl?.length,
            })}
          >
            <div
              className={cn('flex items-center gap-3 text-[14px]', {
                ['flex-col']: !previewUrl,
                ['flex-row-reverse']: previewUrl,
              })}
            >
              {!previewUrl
                ? 'Загрузить изображение'
                : 'Загрузить другое изображение'}
              <Button
                type="button"
                size={'icon-lg'}
                className="relative flex items-center justify-center gap-3"
                onClick={() => inputRef.current?.click()}
              >
                <PlusIcon />
                <div className="absolute">
                  <Controller
                    name="image"
                    control={control}
                    render={({ field: { onChange, ref } }) => {
                      return (
                        <Input
                          type="file"
                          hidden
                          ref={(e) => {
                            ref(e);
                            inputRef.current = e;
                          }}
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              onChange(file);
                              handleFileChange(e);
                            }
                          }}
                        />
                      );
                    }}
                  />
                </div>
              </Button>
            </div>
          </div>
        </div>
        <button type="submit" ref={submitBtnRef} hidden />
      </form>
    </Modal>
  );
}
