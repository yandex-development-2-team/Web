import { useState } from 'react';
import {
  BOXES_AND_SPECPROJECTS_LIST,
  STATISTIC_OF_DAY,
} from '@/mock/boxManagementPage.mock';
import { cn } from '@/utils';
import { StatisticsList } from '@/components/ui/StatiscticsList';
import { ProductsList } from './ProductsList';
import { CreatedProductList } from './CreatedProductList/CreatedProductList';
import { Box1Icon, MagicStickIcon } from '@/assets/icons';
import { CreateBoxModal, CreateProjectModal } from '@/components/ui/Modal';

const BoxManagementPage = () => {
  const [isOpenSpecProjectModal, setIsOpenSpecProjectModal] = useState(false);
  const [isOpenBoxModal, setIsOpenBoxModal] = useState(false);

  return (
    <div className={cn('flex h-full w-full flex-col gap-5')}>
      <div className={cn('bg-card flex flex-col gap-4 rounded-lg p-5')}>
        <h2>Управление коробками и спецпроектами</h2>
        <div className={cn('flex flex-col gap-4')}>
          <h4 className={cn('font-semibold')}>Сводка дня</h4>
          <StatisticsList items={STATISTIC_OF_DAY} />
        </div>
      </div>
      <div className={cn('bg-card flex h-full flex-col gap-5 rounded-lg p-5')}>
        <h4 className={cn('font-semibold')}>Список коробок и спецпроектов</h4>
        <div className={cn('grid h-full grid-cols-2 gap-5')}>
          <ProductsList
            createTitle="Создать коробку"
            onCreateItem={() => setIsOpenBoxModal(true)}
            icon={<Box1Icon />}
          >
            <>
              <CreateBoxModal
                isOpen={isOpenBoxModal}
                onClose={() => setIsOpenBoxModal(false)}
              />
              <CreatedProductList items={BOXES_AND_SPECPROJECTS_LIST.boxes} />
            </>
          </ProductsList>
          <ProductsList
            createTitle="Создать спецпроект"
            onCreateItem={() => {
              console.log('create specialProjects');
              setIsOpenSpecProjectModal(true);
            }}
            icon={<MagicStickIcon />}
          >
            <>
              <CreateProjectModal
                isOpen={isOpenSpecProjectModal}
                onClose={() => setIsOpenSpecProjectModal(false)}
              />
              <CreatedProductList
                items={BOXES_AND_SPECPROJECTS_LIST.specialProjects}
              />
            </>
          </ProductsList>
        </div>
      </div>
    </div>
  );
};

export const Component = BoxManagementPage;
