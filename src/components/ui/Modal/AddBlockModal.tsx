import { Input } from '@/components/ui/Input';
import { Modal } from './Modal';
import { cn } from '@/utils';
import { useState } from 'react';
import { PlusIcon } from '@/assets/icons';
import { v4 as uuidv4 } from 'uuid';
import type { NewBlockType } from '@/mock/analyticsPage.mock';

interface AddBlockModalProps {
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: NewBlockType) => void;
}

function createBlockData({
  title,
  subTitle,
}: {
  title: string;
  subTitle: string;
}) {
  const linkId = uuidv4();

  return {
    id: linkId,
    title,
    subTitle,
    icon: <PlusIcon />,
    link: `/analytics/${linkId}`,
  };
}

export function AddBlockModal({
  isOpen,
  onClose,
  title,
  onSave,
}: AddBlockModalProps) {
  const [blockData, setBlockData] = useState({
    title: '',
    subTitle: '',
  });

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={{
        variant: 'cancel-save',
        onSave: () => {
          console.log('add modal save');
          if (blockData.title && blockData.subTitle) {
            const nBlock = createBlockData({
              title: blockData.title,
              subTitle: blockData.subTitle,
            });

            onSave(nBlock);
            onClose();
          }
        },
      }}
    >
      <div className={cn('flex flex-col gap-4')}>
        <Input
          placeholder="Текст"
          label="Название"
          value={blockData.title}
          onChange={(e) =>
            setBlockData((prev) => {
              const nData = { ...prev };

              return { ...nData, title: e.target.value };
            })
          }
        />
        <Input
          placeholder="Текст"
          label="Описание"
          value={blockData.subTitle}
          onChange={(e) =>
            setBlockData((prev) => {
              const nData = { ...prev };

              return { ...nData, subTitle: e.target.value };
            })
          }
        />
      </div>
    </Modal>
  );
}
