import { Textarea } from '@/components/ui/Textarea';
import { cn } from '@/utils';

interface TextSettingsFormProps {
  className?: string;
  textFormData?: {
    id: string;
    label: string;
    placeholder: string;
  }[];
}

export function TextSettingsForm({
  textFormData = [],
  className,
}: TextSettingsFormProps) {
  return (
    <form className={cn('flex flex-col gap-4', className)}>
      {textFormData.map((item) => {
        return (
          <Textarea
            key={item.id}
            placeholder={item.placeholder}
            label={item.label}
          />
        );
      })}
    </form>
  );
}
