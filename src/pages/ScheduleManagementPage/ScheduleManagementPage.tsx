import { SlidersIcon, UploadArrowIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import {
  COLUMNS_CONTROL_TIME_NAME,
  COLUMNS_CONTROL_TIME_PLACE,
  DATA_CONTROL_TIME,
} from '@/mock/table/mock-control-time';
import { useState } from 'react';
import {
  TABS_SCHEDULE,
  TABS_SCHEDULE_ID,
  type TabId,
} from './scheduleManagementPage.constants';
import { DatePickerInput } from '@/components/ui/DatePickerInput/DatePickerInput';
import { Calendar } from '@/components/ui/Calendar';
import { cn } from '@/utils';
import { SearchBarTable } from '@/components/ui/DataTable/ui';
import { fromISODate, toISODate } from '@/utils/dateHelpers';
import { Tabs } from './Tabs';

type TableSortProps = 'name' | 'time' | 'place';

const ScheduleManagementPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TABS_SCHEDULE_ID.table);
  const [selectedDate, setSelectedDate] = useState<string | undefined>();
  const [isSortMenuOpen, setIsSortMenuOpen] = useState(false);
  const [tableSort, setTableSort] = useState<TableSortProps>('name');
  const [filter, setFilter] = useState('');
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  const choiceStateColumns =
    activeTab === TABS_SCHEDULE_ID.table
      ? COLUMNS_CONTROL_TIME_PLACE
      : COLUMNS_CONTROL_TIME_NAME;
  const stateControls =
    activeTab === TABS_SCHEDULE_ID.table ? 'showMore' : 'showBy';

  const handleTabs = (tabId: TabId) => {
    setActiveTab(tabId);
  };

  const handleTableSort = (colSort: TableSortProps) => {
    setTableSort(colSort);
    setIsSortMenuOpen(false);
  };

  const handleDeleteRow = (rowId: string) => {};

  const handleEditRow = (rowId: string) => {};

  const handleDownloadRow = (rowId: string) => {};

  return (
    <div className="flex h-screen flex-col gap-5">
      <div className="m-5 mb-0 rounded-lg bg-(--color-card)">
        <h2 className="p-5">Управление расписанием</h2>
      </div>
      <div className="m-5 mt-0 h-full rounded-lg bg-(--color-card)">
        <div className="m-5 flex flex-row justify-between">
          <div className="flex flex-row gap-2.5">
            <Tabs
              tabs={TABS_SCHEDULE}
              activeTab={activeTab}
              onTabChange={handleTabs}
            />
          </div>
          <div className="flex flex-row gap-2.5">
            <Button
              variant={'shadow'}
              className="h-11.5 w-11.5 border border-(--color-border) p-1.5 shadow-none"
              onClick={() => setIsSortMenuOpen((s) => !s)}
            >
              <SlidersIcon className="size-8" />
            </Button>
            <Button
              variant={'shadow'}
              className="h-11.5 w-11.5 border border-(--color-border) p-2.75 shadow-none"
            >
              <UploadArrowIcon className="size-6" />
            </Button>
            {isSortMenuOpen && (
              <div
                className={cn(
                  'absolute top-54.5 right-31.5 z-10 rounded-md border bg-white shadow-md',
                  'flex flex-col',
                  'h-20 w-36',
                )}
              >
                {activeTab === TABS_SCHEDULE_ID.table ? (
                  <>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleTableSort('name')}
                      className={cn(
                        'hover:bg-background mt-1 h-9 w-full justify-start rounded-none pt-2 pr-3 pb-2 pl-2.5 text-sm!',
                      )}
                    >
                      По названию
                    </Button>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleTableSort('time')}
                      className={cn(
                        'hover:bg-background mb-1 h-9 w-full justify-start rounded-none pt-2 pr-3 pb-2 pl-2.5 text-sm!',
                      )}
                    >
                      По времени
                    </Button>
                  </>
                ) : (
                  <>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleTableSort('name')}
                      className={cn(
                        'hover:bg-background mt-1 h-9 w-full justify-start rounded-none pt-2 pr-3 pb-2 pl-2.5 text-sm!',
                      )}
                    >
                      По названию
                    </Button>
                    <Button
                      variant={'ghost'}
                      onClick={() => handleTableSort('place')}
                      className={cn(
                        'hover:bg-background mb-1 h-9 w-full justify-start rounded-none pt-2 pr-3 pb-2 pl-2.5 text-sm!',
                      )}
                    >
                      По месту
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
        {activeTab === TABS_SCHEDULE_ID.table ? (
          <DataTable
            data={DATA_CONTROL_TIME}
            columns={COLUMNS_CONTROL_TIME_PLACE}
            rowKey={'id'}
            showControls={stateControls}
            defaultRowCount={11}
            isLoading={isLoading}
            isError={isError}
            rowSelected={{
              enabled: true,
              onChange(ids) {
                console.log(ids);
              },
            }}
            onEditRow={handleEditRow}
            onDeleteRow={handleDeleteRow}
            onDownloadRow={handleDownloadRow}
          />
        ) : (
          <div className="flex gap-4 pl-5">
            <Calendar mode='single' selected={selectedDate ? fromISODate(selectedDate) : undefined} onSelect={(date) => setSelectedDate(date ? toISODate(date) : undefined)} />
            <div className="flex-1">
              <div>
                <div className={cn('flex gap-5 ml-5')}>
                  <div className={cn('[&>div>div:first-child>svg]:hidden w-26.25 h-11 [&_input]:p-0 [&_input]:text-center')}>
                    <DatePickerInput
                    value={selectedDate}
                    onChange={setSelectedDate}
                    label=''
                  />
                  </div>
                  <div className={cn('flex-1 mr-5')}>
                    <SearchBarTable value={filter} onChange={setFilter} />
                  </div>
                </div>
                <DataTable
                  data={DATA_CONTROL_TIME}
                  columns={choiceStateColumns}
                  rowKey={'id'}
                  showControls={stateControls}
                  defaultRowCount={5}
                  isLoading={isLoading}
                  isError={isError}
                  filter={filter}
                  dateRange={{
                    fromDate: selectedDate,
                    toDate: selectedDate,
                    getDate: (row) => row.date
                  }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Component = ScheduleManagementPage;
