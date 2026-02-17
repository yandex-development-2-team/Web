import { useState } from 'react';
import {
  ACCESS_ITEMS,
  TABS,
  TABS_ID,
  type TabId,
} from './systemSettingsPage.constants';
import { cn } from '@/utils';
import { Tabs } from './Tabs';
import { Button } from '@/components/ui/Button';
import { TextSettingsForm } from './TextSettingsForm';
import { SectionToggle } from './SectionToggle';
import { contentSettingsData } from '@/mock/systemSettingsPage.mock';

const SystemSettingsPage = () => {
  const [activeTab, setActiveTab] = useState<TabId>(TABS_ID.access);
  const [isToggleOpen, setIsToggleOpen] = useState(false);

  const handleTabs = (tabId: TabId) => {
    if (activeTab === TABS_ID.content) {
      setIsToggleOpen(false);
    }
    setActiveTab(tabId);
  };

  return (
    <div className={cn('flex h-full flex-col gap-5', 'pl-82')}>
      <div className={cn('bg-card rounded-lg p-5')}>
        <h2>Системные настройки</h2>
      </div>

      <div
        className={cn(
          'relative flex flex-1 flex-col rounded-lg transition-all duration-300',
          {
            ['bg-card gap-8 p-5']:
              !isToggleOpen || activeTab === TABS_ID.content,
            ['gap-5']: isToggleOpen || activeTab === TABS_ID.content,
          },
        )}
      >
        <div className={cn('flex items-center justify-between')}>
          <Tabs tabs={TABS} onTabChange={handleTabs} activeTab={activeTab} />
          {(isToggleOpen || activeTab === TABS_ID.content) && (
            <div className={cn('flex items-center gap-5')}>
              <Button variant={'default-secondary'}>Отменить</Button>
              <Button>Сохранить</Button>
            </div>
          )}
        </div>

        {activeTab === TABS_ID.access && (
          <SectionToggle items={ACCESS_ITEMS} onOpenChange={setIsToggleOpen} />
        )}

        {activeTab === TABS_ID.content && (
          <TextSettingsForm textFormData={contentSettingsData} />
        )}
      </div>
    </div>
  );
};

export const Component = SystemSettingsPage;
