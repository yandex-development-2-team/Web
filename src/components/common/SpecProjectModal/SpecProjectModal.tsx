import { useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { cn } from '@/utils';
import { Input } from '@/components/ui/Input';
import { SwitchItem } from '@/components/ui/Switch';
import { Modal } from '@/components/ui/Modal';
import { useCreateProduct, usePreview, useUpdateProduct } from '@/hooks';
import { ImagePicker } from '@/components/ui/ImagePicker';
import type { UnitProductType } from '@/services/product.service';

interface IFormValues {
  id: string;
  title: string;
  isActive: boolean;
  description: string;
  image: File | null;
}

interface ProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  titleModal?: string;
  item?: UnitProductType;
  variant?: 'create' | 'edit';
}

export function ProjectModal({
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
          }
        : { ...item },
  });
  const submitBtnRef = useRef<HTMLButtonElement>(null);
  const { handleFileChange, previewUrl, setPreviewUrl } = usePreview();
  const { mutate: createProduct } = useCreateProduct();
  const { mutate: updateProduct } = useUpdateProduct();

  const onSubmit = (data: IFormValues) => {
    if (variant === 'create') {
      const newData = { ...data, id: uuidv4() };
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
      title={`${variant === 'create' ? 'Создать' : 'Редактировать'} спецпроект`}
      footer={{
        variant: 'cancel-save',
        onSave: () => submitBtnRef.current?.click(),
      }}
    >
      <form
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
                  checked={field.value}
                  onToggle={field.onChange}
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
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <ImagePicker
                variantView="specProduct"
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
