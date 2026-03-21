import { useParams } from 'react-router';
import { PlusIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DeleteModal } from '@/components/ui/Modal';
import { cn } from '@/utils';
import { useModal } from '@/hooks';
import { Input } from '@/components/ui/Input';
import { useRef } from 'react';
import { useFileUpload } from '@/hooks';
import { useQuery } from '@tanstack/react-query';
import { fetchFileList } from '@/services/uploadFile.service';
import { UploadList } from '@/components/ui/UploadList/UploadList';

const DEFAULT_PAGE_DATA = {
  title: 'Рабочие моментики',
};

export function AnalyticDynamicPage() {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const { isOpen, open, close } = useModal();
  const { id } = useParams();
  const { handleFileChange } = useFileUpload();
  const { data = [] } = useQuery({
    queryKey: ['files', 'list'],
    queryFn: fetchFileList,
  });

  return (
    <div className="flex h-full flex-col justify-between gap-5">
      <div className={cn('flex h-full w-full flex-col gap-5')}>
        <div className={cn('bg-card flex flex-col gap-5 rounded-lg p-5')}>
          <h2>{DEFAULT_PAGE_DATA.title}</h2>
        </div>
        <div className="bg-card flex flex-col gap-8 rounded-lg p-5">
          {(!Array.isArray(data) ||
            (Array.isArray(data) && data.length === 0)) && (
            <p className="text-[24px] font-normal">
              В этом блоке пока нет данных, добавьте первый элемент, чтобы
              начать работу
            </p>
          )}
          <div className="button-text border-b-muted relative flex max-w-103 items-center gap-3 border-b p-3">
            <Button size={'icon-lg'} onClick={() => inputRef.current?.click()}>
              <PlusIcon />
            </Button>
            Добавить файл
            <div className="absolute">
              <Input
                type="file"
                hidden
                ref={inputRef}
                accept=".pdf,.doc,.docx,.xls,.xlsx"
                onChange={handleFileChange}
              />
            </div>
          </div>
          <UploadList items={Array.isArray(data) ? data : []} />
        </div>
      </div>
      <DeleteModal
        itemId={id ? id : ''}
        isOpen={isOpen}
        onClose={close}
        deletePath={`/api/v1/file/${id}`}
        onConfirm={() => (id ? true : false)}
      />
      <Button variant={'danger-secondary'} className="ml-auto" onClick={open}>
        Удалить блок
      </Button>
    </div>
  );
}

export const Component = AnalyticDynamicPage;
