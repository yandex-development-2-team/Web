import { cn } from '@/utils';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './Tabs';
import { EXPORT_PAGE_TABS, TABS_ID } from './dataExportPage.constants';

const DataExportPage = () => {
  return (
    <div className={cn('flex h-full w-full flex-col gap-5')}>
      <Tabs defaultValue={TABS_ID.defaultTab} className="h-full">
        <div className={cn('bg-card flex flex-col gap-5 rounded-lg p-5')}>
          <h2>Экспортированные файлы</h2>
          <TabsList variant="line" className="border-accent border-b">
            {EXPORT_PAGE_TABS.tabsTriggers.map((trigger) => (
              <TabsTrigger value={trigger.value} key={trigger.id}>
                <div className="flex items-center gap-2 text-[20px]">
                  {trigger.icon}
                  {trigger.label}
                </div>
              </TabsTrigger>
            ))}
          </TabsList>
        </div>
        <div className="bg-card min-h-80 flex-1 rounded-lg p-5">
          {EXPORT_PAGE_TABS.tabsContent.map((content) => (
            <TabsContent key={content.id} value={content.value}>
              {content.content}
            </TabsContent>
          ))}
        </div>
      </Tabs>
    </div>
  );
};

export const Component = DataExportPage;
