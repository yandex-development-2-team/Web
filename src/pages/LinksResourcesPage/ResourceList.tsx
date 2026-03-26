import { Link } from 'react-router';
import { Button } from '@/components/ui/Button';
import { DeleteModal } from '@/components/ui/Modal';
import { useModal } from '@/hooks';

interface ReasourceItemProps {
  label: string;
  id: string;
  url: string;
  onDelete?: (id: string) => void;
}

export function ReasourceItem({
  id,
  label,
  url,
  onDelete,
}: ReasourceItemProps) {
  const { open, close, isOpen } = useModal();

  const handleDelete = () => {
    open();
    onDelete?.(id);
  };

  return (
    <div className="list-items flex items-center gap-3 px-3">
      <Button variant={'link'} className="p-0" asChild>
        <Link to={url ? url : ''} target="_blank" rel="noopener noreferrer">
          {label}
        </Link>
      </Button>
      <Button variant={'ghost'} size={'icon-md'} onClick={handleDelete}>
        ✕
      </Button>
      <DeleteModal
        isOpen={isOpen}
        onClose={close}
        onConfirm={() => console.log('configrm ', id)}
        itemId=""
        deletePath=""
        titleModal="Удалить ссылку"
        descriptionModal="Вы действительно хотите удалить эту ссылку? Действие нельзя отменить."
      />
    </div>
  );
}

interface ReasourceListProps {
  items: { id: string; label: string; url: string }[];
}

export function ReasourceList({ items }: ReasourceListProps) {
  const handleDelete = (id: string) => {
    console.log('delete ', id);
  };

  return (
    <div className="flex w-260 flex-wrap gap-4">
      {items.map((item) => (
        <ReasourceItem
          key={item.id}
          label={item.label}
          id={item.id}
          url={item.url}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
}
