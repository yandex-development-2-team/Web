import { useState } from 'react';
import type { FileType } from '@/mock/exporting-files-page.mock';
import { UploadItem } from './UploadItem';

interface UploadListProps {
  items: FileType[];
}

export function UploadList({ items }: UploadListProps) {
  const [files, setFiles] = useState<FileType[]>(items);

  const handleRemoveFile = (id: string) => {
    setFiles((prev) => prev.filter((f) => f.id !== id));
  };

  return (
    <div className="list flex max-w-103 flex-col gap-3">
      {!files.length && <h2>Список пуст</h2>}
      {files.map((item) => (
        <UploadItem key={item.id} item={item} onRemoveItem={handleRemoveFile} />
      ))}
    </div>
  );
}
