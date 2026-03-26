import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import z from 'zod';
import { Button } from '@/components/ui/Button';
import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/utils';

const textareaSchema = z.object({
  content: z
    .string()
    .min(1, 'Поле обязательно')
    .max(500, 'Максимум 500 символов'),
});

type TextareaSchemaType = z.infer<typeof textareaSchema>;

interface DescriptionFormProps extends React.PropsWithChildren {
  onSubmit?: (data: TextareaSchemaType) => void;
}

export function DescriptionForm({ onSubmit }: DescriptionFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(textareaSchema),
  });

  const handleFormSubmit = (data: TextareaSchemaType) => {
    console.log(data, ' text form');
    onSubmit?.(data);
    reset();
  };

  const handleDelete = () => {
    reset({ content: '' });
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('flex flex-col gap-5 py-5')}
    >
      <div className="flex flex-col gap-2">
        <Textarea
          id="content"
          {...register('content')}
          label="Текст"
          placeholder="Введите текст"
          error={errors.content?.message}
        />
      </div>

      <div className="flex justify-end gap-2">
        <Button
          variant={'default-secondary'}
          type="reset"
          onClick={handleDelete}
        >
          Удалить
        </Button>
        <Button type="submit">Сохранить</Button>
      </div>
    </form>
  );
}
