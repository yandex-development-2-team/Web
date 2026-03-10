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
import { TimeRangeInput } from '@/components/ui/TimeIntervalPicker';
import type { ProjectItem } from '@/mock/boxManagementPage.mock';

interface IFormValues {
  title: string;
  isActive: boolean;
  description: string;
  image: File | null;
  date: string;
  timeRange: {
    from: number;
    to: number;
  };
  location: string;
  rules: string | string[];
  cost: string | number;
  organizer: string;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  variant?: 'create' | 'edit';
  item?: ProjectItem;
}

export function BoxModal({
  isOpen,
  onClose,
  variant = 'create',
  item,
}: ProjectModalProps) {
  const { control, handleSubmit, reset } = useForm<IFormValues>({
    defaultValues:
      variant === 'create'
        ? {
            title: '',
            isActive: false,
            description: '',
            image: null,
            cost: '',
            date: '',
            location: '',
            organizer: '',
            rules: '',
            timeRange: {
              from: 0,
              to: 0,
            },
          }
        : { ...item },
  });
  const inputRef = useRef<HTMLInputElement | null>(null);
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { handleFileChange, previewUrl, setPreviewUrl } = usePreview();

  const onSubmit = (data: IFormValues) => data;
  const onReset = () => {
    onClose();
    reset();
    setPreviewUrl(null);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onReset}
      title={`${variant === 'create' ? 'Создать' : 'Редактировать'} коробочное решение`}
      footer={{
        variant: 'cancel-save',
        onSave: () => submitBtnRef.current?.click(),
      }}
    >
      <form
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
                  checked={field.value}
                  onToggle={field.onChange}
                  label="Активно"
                  className="flex flex-row-reverse"
                />
              );
            }}
          />
        </div>
        <div className={cn('grid grid-cols-2 gap-3')}>
          <Controller
            name="date"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <DatePickerInput
                  label=""
                  value={value}
                  onChange={(data) => onChange(data)}
                />
              );
            }}
          />
          <Controller
            name="timeRange"
            control={control}
            render={({ field: { onChange, value } }) => {
              return (
                <TimeRangeInput
                  placeholder="Выберите время"
                  value={value}
                  onChange={(tr) => {
                    onChange(tr);
                  }}
                />
              );
            }}
          />
        </div>
        <Controller
          name="location"
          control={control}
          render={({ field }) => {
            return <Textarea {...field} label="Место" placeholder="Текст" />;
          }}
        />
        <Controller
          name="description"
          control={control}
          render={({ field }) => {
            return <Input {...field} label="Описание" placeholder="Текст" />;
          }}
        />
        <Controller
          name="rules"
          control={control}
          render={({ field }) => {
            return <Input {...field} label="Правила" placeholder="Текст" />;
          }}
        />
        <div className={cn('grid grid-cols-2 gap-3')}>
          <Controller
            name="cost"
            control={control}
            render={({ field }) => {
              return <Input {...field} label="Стоимость" placeholder="Текст" />;
            }}
          />
          <Controller
            name="organizer"
            control={control}
            render={({ field }) => {
              return (
                <Input {...field} label="Организатор" placeholder="Текст" />
              );
            }}
          />
        </div>
        <div
          className={cn('grid items-center gap-3 transition-all duration-300', {
            ['justify-end; grid-cols-2']: previewUrl,
            ['grid-cols-1']: !previewUrl,
          })}
        >
          {previewUrl && (
            <div className={cn('relative overflow-hidden object-cover')}>
              <img src={previewUrl} alt="preview" />
            </div>
          )}
          <div
            className={cn('flex items-center justify-center rounded-lg', {
              ['bg-card justify-center pl-0']: previewUrl,
              ['bg-background border-border h-23.5 border']: !previewUrl,
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
