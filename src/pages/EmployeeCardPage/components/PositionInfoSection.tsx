import { Section } from '@/pages/EmployeeAddPage/components/Section';
import { InfoRow } from './InfoRow';

type Props = {
  department: string;
  position: string;
  manager: string;
};

export function PositionInfoSection({ department, position, manager }: Props) {
  return (
    <Section
      title="Должностная информация"
      withIcon={false}
      className="space-y-2 border-0 bg-transparent p-0 shadow-none"
      titleClassName="text-xl font-semibold"
    >
      <div className="space-y-3">
        <InfoRow label="Отдел" value={department} />
        <InfoRow label="Должность" value={position} />
        <InfoRow label="Начальник" value={manager} />
      </div>
    </Section>
  );
}
