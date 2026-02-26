import { UploadArrowIcon } from '@/assets/icons';
import { Button } from '@/components/ui/Button';
import { DataTable } from '@/components/ui/DataTable';
import { MetricCard } from '@/components/ui/MetricCard/MetricCard';
import { COLUMNS_ANALYTIC_USER, DATA_ANALYTIC_USER } from '@/mock/mock-table';
import { useState } from 'react';

const UsersAnalyticsPage = () => {
  const [isLoading] = useState(false);
  const [isError] = useState(false);

  return (
    <div className="m-5 flex flex-col gap-5">
      <div className="rounded-lg bg-(--color-card)">
        <div className="m-5 mb-4 flex flex-col gap-4">
          <h2>Аналитика пользователей</h2>
          <h3 className="font-semibold">Сводка</h3>
        </div>
        <div className="m-5 mt-0 flex flex-row gap-5">
          <MetricCard label="Зашли в бот" metric={150}></MetricCard>
          <MetricCard label="Подали заявку" metric={120}></MetricCard>
          <MetricCard
            label="Просмотры заявки"
            metric={30}
            variant="danger"
          ></MetricCard>
        </div>
      </div>
      <div className="rounded-lg bg-(--color-card)">
        <div className="m-5 mb-8 flex flex-row gap-3">
          <Button className="w-42">Выбрать</Button>
          <Button
            variant={'shadow'}
            className="- h-11.5 w-11.5 border border-(--color-border) p-2.75 shadow-none"
          >
            <UploadArrowIcon className="size-6" />
          </Button>
        </div>
        <DataTable
          data={DATA_ANALYTIC_USER}
          columns={COLUMNS_ANALYTIC_USER}
          rowKey="id"
          isLoading={isLoading}
          isError={isError}
        />
      </div>
    </div>
  );
};

export const Component = UsersAnalyticsPage;
