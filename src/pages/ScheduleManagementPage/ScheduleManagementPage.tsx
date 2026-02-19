import { SlidersIcon, UploadArrowIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import {
  COLUMNS_CONTROL_TIME_NAME,
  COLUMNS_CONTROL_TIME_PLACE,
  DATA_CONTROL_TIME,
} from '@/mock/mock-table';
import { useState } from 'react';

type TableStateContent = 'name' | 'place';
type TableStateConrols = 'showBy' | 'showMore';
const controlsByContent: Record<TableStateContent, TableStateConrols> = {
  name: 'showMore',
  place: 'showBy'
}

const ScheduleManagementPage = () => {
  const [stateContent, setStateContent] = useState<TableStateContent>('name');

  const choiceStateColumns = stateContent === 'name' ? COLUMNS_CONTROL_TIME_NAME : COLUMNS_CONTROL_TIME_PLACE;
  const stateControls = controlsByContent[stateContent];

  return (
    <div className="flex flex-col gap-5 h-screen">
      <div className="rounded-lg bg-(--color-card) m-5 mb-0">
        <h2 className="p-5">Управление расписанием</h2>
      </div>
      <div className="rounded-lg bg-(--color-card) m-5 mt-0 h-full">
        <div className="m-5 flex flex-row justify-between">
          <div className="flex flex-row gap-2.5">
            <Button>Таблица</Button>
            <Button>Календарь</Button>
          </div>
          <div className="flex flex-row gap-2.5">
            <Button
              variant={'shadow'}
              className="h-11.5 w-11.5 border border-(--color-border) p-1.5 shadow-none"
              onClick={() => setStateContent((s) => (s === 'name' ? 'place' : 'name'))}
            >
              <SlidersIcon className="size-8" />
            </Button>
            <Button
              variant={'shadow'}
              className="h-11.5 w-11.5 border border-(--color-border) p-2.75 shadow-none"
            >
              <UploadArrowIcon className="size-6" />
            </Button>
          </div>
        </div>
        <DataTable
          data={DATA_CONTROL_TIME}
          columns={choiceStateColumns}
          rowKey={'id'}
          showControls={stateControls}
          defaultRowCount={5}
        />
      </div>
    </div>
  );
};

export const Component = ScheduleManagementPage;
