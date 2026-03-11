import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import { Section } from './Section';
import type { FormProps } from './formTypes';

export function PositionSection({ register }: FormProps) {
  return (
    <Section
      className="col-span-12 p-5 pt-3 pb-4 lg:col-span-5"
      title="Должностная информация"
    >
      <div className="flex flex-col gap-3">
        <Label className="flex flex-col">
          Отдел
          <Select className="mt-1" size="sm" {...register('department')}>
            <option value="department">Отдел</option>
            <option value="department-2">Отдел 2</option>
          </Select>
        </Label>

        <Label className="flex flex-col">
          Должность
          <Select className="mt-1" size="sm" {...register('position')}>
            <option value="position">Должность</option>
            <option value="position-2">Должность 2</option>
          </Select>
        </Label>
      </div>
    </Section>
  );
}
