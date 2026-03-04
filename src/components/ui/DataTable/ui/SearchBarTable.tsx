import { Input } from '@/components/ui/Input';

type SearchBarTableProps = {
  value: string;
  onChange: (s: string) => void;
};

export function SearchBarTable({ value, onChange }: SearchBarTableProps) {
  return (
    <Input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
