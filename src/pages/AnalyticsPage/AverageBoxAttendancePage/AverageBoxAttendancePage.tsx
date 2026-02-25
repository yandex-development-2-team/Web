import { DataTable } from '@/components/ui/DataTable';
import { SearchBarTable } from '@/components/ui/DataTable/ui/SearchBarTable';
import { MetricCard } from '@/components/ui/MetricCard';
import { COLUMNS_ANALYTIC_USER, DATA_ANALYTIC_USER } from '@/mock/mock-table';
import { useState } from 'react';

const AverageBoxAttendancePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isError] = useState(false);
  const [filter, setFilter] = useState('');

  return (
    <div className="flex h-screen flex-col gap-5">
      <div className="m-5 mb-0 rounded-lg bg-(--color-card)">
        <h2 className="m-5 mb-0">Сводка дня по заявкам</h2>
        <div className="m-5 mt-0 flex flex-row gap-5">
          <MetricCard label="Принятые заявки" metric={29}></MetricCard>
          <MetricCard label="Реализованные" metric={25}></MetricCard>
          <MetricCard
            label="Нереализованные"
            metric={4}
            variant="danger"
          ></MetricCard>
        </div>
      </div>
      <div className="m-5 mt-0 rounded-lg bg-(--color-card)">
        <div className="m-5 mb-8 flex flex-row gap-3">
          <SearchBarTable value={filter} onChange={setFilter} />
        </div>
        <DataTable
          columns={COLUMNS_ANALYTIC_USER}
          data={DATA_ANALYTIC_USER}
          isLoading={isLoading}
          isError={isError}
          defaultRowCount={5}
          rowKey={'id'}
          filter={filter}
          showControls="pagination"
        />
      </div>
    </div>
  );
};

export const Component = AverageBoxAttendancePage;
