import { cn } from '@/utils';
import type { TabId, TabItem } from './systemSettingsPage.constants';

interface TabsProps {
  tabs: TabItem[];
  activeTab: TabId;
  onTabChange: (tabId: TabId) => void;
}

export function Tabs({ tabs, activeTab, onTabChange }: TabsProps) {
  return (
    <div className={cn('flex items-center justify-between')}>
      <div
        className={cn(
          'tab-header',
          'border-primary grid w-fit grid-cols-2 rounded-lg border',
          'bg-card w-140.5',
        )}
      >
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={cn(
              'button-text hover:bg-accent-strong w-full cursor-pointer rounded-none px-8 py-3 transition-all duration-300',
              {
                ['bg-primary']: activeTab === tab.id,
              },
            )}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}
