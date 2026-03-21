import { Section } from '@/pages/EmployeeAddPage/components/Section';
import { InfoRow } from './InfoRow';

type Props = {
  phone: string;
  email: string;
  city: string;
};

export function ContactInfoSection({ phone, email, city }: Props) {
  return (
    <Section
      title="Контактная информация"
      withIcon={false}
      className="space-y-2 border-0 bg-transparent p-0 shadow-none"
      titleClassName="text-xl font-semibold"
    >
      <div className="space-y-4">
        <InfoRow label="Телефон" value={phone} />
        <InfoRow label="E-mail" value={email} />
        <InfoRow label="Место проживания" value={city} />
      </div>
    </Section>
  );
}
