import { Label } from '@/components/ui/Label';
import { Select } from '@/components/ui/Select';
import type { FormProps } from './formTypes';

export function PositionSection({ register }: FormProps) {
  return (
    <div className="space-y-3">
      <h3 className="pb-2 text-2xl font-bold">Должностная информация</h3>

      <Label className="flex flex-col gap-1">
        Отдел
        <Select size="sm" {...register('department')}>
          <option value="department">Отдел</option>
          <option value="department-2">Отдел 2</option>
        </Select>
      </Label>

      <Label className="flex flex-col gap-1">
        Должность
        <Select size="sm" className="pl-2" {...register('position')}>
          <option value="position">&nbsp;Должность</option>
          <option value="position-2">&nbsp;Должность 2</option>
        </Select>
      </Label>

      <Label className="flex flex-col gap-1">
        Начальник
        <Select size="sm" {...register('position')}>
          <option value="position">Начальник</option>
          <option value="position-2">Начальник 2</option>
        </Select>
      </Label>
    </div>
  );
}
