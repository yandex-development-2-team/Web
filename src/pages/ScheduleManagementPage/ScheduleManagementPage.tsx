import { SlidersIcon, UploadArrowIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import {
  COLUMNS_CONTROL_TIME_NAME,
  COLUMNS_CONTROL_TIME_PLACE,
  DATA_CONTROL_TIME,
} from '@/mock/mock-table';
import { useState } from 'react';

type TableState = 'name' | 'place';

const ScheduleManagementPage = () => {
  const [state, setState] = useState<TableState>('name');

  const choiceState =
    state === 'name' ? COLUMNS_CONTROL_TIME_NAME : COLUMNS_CONTROL_TIME_PLACE;

  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="rounded-lg bg-(--color-card)">
        <h2 className="p-5">Управление расписанием</h2>
      </div>
      <div className="rounded-lg bg-(--color-card)">
        <div className="m-5 flex flex-row justify-between">
          <div className="flex flex-row gap-2.5">
            <Button>Таблица</Button>
            <Button>Календарь</Button>
          </div>
          <div className="flex flex-row gap-2.5">
            <Button
              variant={'shadow'}
              className="h-11.5 w-11.5 border border-(--color-border) p-1.5 shadow-none"
              onClick={() => setState((s) => (s === 'name' ? 'place' : 'name'))}
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
          columns={choiceState}
          rowKey={'id'}
        />
      </div>
    </div>
  );
};

export const Component = ScheduleManagementPage;
