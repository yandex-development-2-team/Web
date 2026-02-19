import { DataTable } from '@/components/ui/DataTable/DataTable';
import { COLUMNS_ANALYTIC_USER, DATA_ANALYTIC_USER } from '@/mock/mock-table';

const SystemSettingsPage = () => {
  return (
    <div className="m-5">
      <div className="m-5">
        <DataTable
          data={DATA_ANALYTIC_USER}
          columns={COLUMNS_ANALYTIC_USER}
          rowKey='id'
        />
      </div>
    </div>
  );
};

export const Component = SystemSettingsPage;
