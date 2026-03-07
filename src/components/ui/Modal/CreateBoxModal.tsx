import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';
import { SwitchItem } from '@/components/ui/Switch';
import { Modal } from './Modal';
import { Button } from '@/components/ui/Button';
import { usePreview } from '@/hooks';
import { PlusIcon } from '@/assets/icons';
import { DatePickerInput } from '@/components/ui//DatePickerInput/DatePickerInput';
import { Textarea } from '@/components/ui/Textarea';

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

export function CreateBoxModal({ isOpen, onClose }: CreateProjectModalProps) {
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
      title="Создать коробочное решение"
      footer={{
        variant: 'cancel-save',
        onSave: () => submitBtnRef.current?.click(),
      }}
    >
      <form
        id="my-form-id"
        className={cn('flex flex-col gap-4')}
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className={cn('grid grid-cols-2 gap-3')}>
          <Controller
            name="title"
            control={control}
            render={({ field }) => {
              return <Input {...field} label="Название" placeholder="Текст" />;
            }}
          />
          <Controller
            name="isActive"
            control={control}
            render={({ field }) => {
              return (
                <SwitchItem
                  {...field}
                  label="Активно"
                  className="flex flex-row-reverse"
                />
              );
            }}
          />
        </div>
        <div className={cn('grid grid-cols-2 gap-3')}>
          <DatePickerInput onChange={(data) => console.log(data)} label="" />
          <DatePickerInput onChange={(data) => console.log(data)} label="" />
        </div>
        <Textarea label="Место" />
        <Input label="Описание" />
        <Input label="Правила" />
        <div className={cn('grid grid-cols-2 gap-3')}>
          <Input placeholder="Стоимость" />
          <Input placeholder="Организатор" />
        </div>
        <div
          className={cn('grid items-center gap-3 transition-all duration-300', {
            ['justify-end; grid-cols-2']: previewUrl?.length,
            ['grid-cols-1']: !previewUrl?.length,
          })}
        >
          {previewUrl?.length && (
            <div className={cn('relative overflow-hidden object-cover')}>
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
              className={cn(
                'flex flex-row-reverse items-center gap-3 text-[14px]',
              )}
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
