import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';
import { SwitchItem } from '@/components/ui/Switch';
import { Modal } from '@/components/ui/Modal';
import { usePreview } from '@/hooks';
import { DatePickerInput } from '@/components/ui//DatePickerInput/DatePickerInput';
import { Textarea } from '@/components/ui/Textarea';
import { TimeRangeInput } from '@/components/ui/TimeIntervalPicker';
import { ImagePicker } from '@/components/ui/ImagePicker';
import { useCreateProduct, useUpdateProduct } from '@/hooks';
import type { UnitProductType } from '@/services/product.service';

interface IFormValues {
  id: string;
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
  item?: UnitProductType;
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
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { handleFileChange, previewUrl, setPreviewUrl } = usePreview();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const onSubmit = (data: IFormValues) => {
    if (variant === 'create') {
      const newData = { ...data };
      createProduct({ path: '', data: newData });
    } else if (item) {
      updateProduct({ id: item.id, data, path: '' });
    }
  };

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
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <ImagePicker
                previewUrl={previewUrl}
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
        <button type="submit" ref={submitBtnRef} hidden />
      </form>
    </Modal>
  );
}
