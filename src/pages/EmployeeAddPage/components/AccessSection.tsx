import { Controller, type Control } from 'react-hook-form';
import { Switch } from '@/components/ui/Switch';
import { Section } from './Section';
import type { EmployeeAddFormValues } from '@/utils/employeeAddValidator';
import type { FormProps } from './formTypes';

const ACCESS_LEVELS = [
  { name: 'admin', title: 'Администратор', desc: 'Полный доступ' },
  { name: 'manager1', title: 'Менеджер 2 звена', desc: 'Ограниченный доступ' },
  { name: 'manager2', title: 'Менеджер 1 звена', desc: 'Ограниченный доступ' },
  { name: 'manager3', title: 'Менеджер 3 звена', desc: 'Ограниченный доступ' },
] as const;

function AccessSwitch({
  name,
  control,
}: {
  name: keyof EmployeeAddFormValues;
  control: Control<EmployeeAddFormValues>;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          className="data-[state=unchecked]:bg-muted [&_[data-slot=switch-thumb]]:data-[state=unchecked]:bg-muted-foreground data-[state=unchecked]:ring-muted-foreground"
          checked={field.value}
          onCheckedChange={field.onChange}
        />
      )}
    />
  );
}

export function AccessSection({ control }: FormProps) {
  return (
    <Section
      className="col-span-12 mb-3 p-5 pt-3 pb-6 lg:col-span-7"
      title="Уровень доступа"
    >
      <div className="grid grid-cols-1 gap-y-10 md:gap-x-5 lg:grid-cols-2 lg:gap-x-[clamp(10px,1vw,4vw)] xl:gap-x-25">
        {ACCESS_LEVELS.map(({ name, title, desc }) => (
          <div
            key={name}
            className="border-border flex items-center justify-between border-b pb-1"
          >
            <div className="min-w-0 space-y-1">
              <p className="truncate text-sm">{title}</p>
              <p className="text-muted-foreground text-xs">{desc}</p>
            </div>

            <AccessSwitch name={name} control={control} />
          </div>
        ))}
      </div>
    </Section>
  );
}
