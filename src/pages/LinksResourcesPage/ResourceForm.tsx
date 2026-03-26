import { useForm } from 'react-hook-form';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { cn } from '@/utils';

const doubleInputSchema = z.object({
  name: z.string().min(1, 'Название обязательно'),
  url: z.url('Введите корректный URL'),
});

type DoubleInputSchemaType = z.infer<typeof doubleInputSchema>;

interface ResourceFormProps extends React.PropsWithChildren {
  // fieldItems?: { label: string; placeholder?: string }[];
  onSubmit?: (data: DoubleInputSchemaType) => void;
}

export function ResourceForm({ onSubmit }: ResourceFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm({
    resolver: zodResolver(doubleInputSchema),
  });

  const handleFormSubmit = (data: DoubleInputSchemaType) => {
    console.log(data, ' resource form');
    onSubmit?.(data);
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className={cn('grid grid-cols-[1fr_auto] gap-5 py-5')}
    >
      <div className="flex flex-col gap-5">
        <Input
          {...register('name')}
          placeholder="Название"
          label="Название"
          error={errors.name?.message}
        />
        <Input
          {...register('url')}
          placeholder="Ссылка"
          label="URL"
          error={errors.url?.message}
        />
      </div>
      <div className="flex items-end justify-end gap-2">
        <Button type="submit">Загрузить</Button>
      </div>
    </form>
  );
}
