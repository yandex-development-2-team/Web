import { useState } from 'react';
import { PlusIcon } from '@/assets/icons';
import { CreateButton } from '@/components/ui/Button';
import { ButtonAddCard, ButtonCard } from '@/components/ui/Button/ButtonCard';
import { AddBlockModal } from '@/components/ui/Modal';
import { cn } from '@/utils';
import {
  ANALITICS_PAGES_DATA,
  ANALYTICS_PAGE_TABS,
  CREATE_BUTTONS,
  TABS_ID,
} from './analyticsPage.constants';
import { useModal } from '@/hooks';
import { ContactiItem } from '@/components/ui/ContactItem';
import {
  TabsButton as Tabs,
  TabsButtonContent as TabsContent,
  TabsButtonList as TabsList,
  TabsButtonTrigger as TabsTrigger,
} from '@/components/ui/TabsLine';
import { TEAM_OF_DAY, type NewBlockType } from '@/mock/analyticsPage.mock';
import { BoxModal } from '@/components/common/BoxModal';
import { ProjectModal } from '@/components/common/SpecProjectModal';

const AnalyticsPage = () => {
  const { isOpen, open, close } = useModal();
  const {
    isOpen: isOpenBoxModal,
    open: openBoxModal,
    close: closeBoxModal,
  } = useModal();
  const {
    isOpen: isOpenProjectModal,
    open: openProjectModal,
    close: closeProjectModal,
  } = useModal();
  const [store, setStore] = useState<NewBlockType[]>(ANALITICS_PAGES_DATA);

  const handleSave = (data: NewBlockType) => {
    setStore((prev) => {
      const nArr = [...prev];

      return [...nArr, data];
    });
  };

  const handleCreate = (id: string) => {
    if (id === 'create_box') {
      openBoxModal();
      return;
    }

    if (id === 'create_spec_project') {
      openProjectModal();
      return;
    }

    return null;
  };

  return (
    <div className="flex w-full flex-col gap-5 pr-1">
      <BoxModal isOpen={isOpenBoxModal} onClose={closeBoxModal} />
      <ProjectModal isOpen={isOpenProjectModal} onClose={closeProjectModal} />
      <div className="flex items-center gap-5">
        {CREATE_BUTTONS.map((btn) => (
          <CreateButton
            key={btn.id}
            title={btn.title}
            icon={btn.icon}
            to={btn.to ? btn.to : ''}
            onCreateItem={() => handleCreate(btn.id)}
          />
        ))}
      </div>
      <div
        className={cn(
          'grid grid-cols-[repeat(auto-fill,minmax(340px,1fr))] justify-between gap-5 overflow-auto',
          'h-145',
        )}
      >
        {store.map((cardItem) => (
          <ButtonCard key={cardItem.id} {...cardItem} to={cardItem.link} />
        ))}
        <ButtonAddCard
          className="max-w-85"
          icon={<PlusIcon />}
          onClick={open}
        />
        <AddBlockModal
          isOpen={isOpen}
          onSave={handleSave}
          onClose={close}
          title="Добавить блок"
        />
      </div>
      <div className="grid grid-cols-[56%_1fr] gap-5 2xl:grid-cols-[66%_1fr]">
        <div className="bg-card flex flex-col gap-10 rounded-lg p-5">
          <Tabs defaultValue={TABS_ID.defaultTab}>
            <div className="flex items-center justify-between">
              <h4 className="h4-sm-text self-start">Сводка</h4>
              <div>
                <TabsList>
                  {ANALYTICS_PAGE_TABS.tabTriggers.map((trigger) => (
                    <TabsTrigger key={trigger.id} value={trigger.value}>
                      <span>{trigger.label}</span>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </div>
            </div>
            <div className="flex items-center gap-5">
              {ANALYTICS_PAGE_TABS.tabContents.map((content) => (
                <TabsContent key={content.id} value={content.value}>
                  {content.content}
                </TabsContent>
              ))}
            </div>
          </Tabs>
        </div>
        <div className="bg-card flex max-h-78.5 flex-col gap-3 rounded-lg p-5">
          <h4 className="h4-sm-text">Команда дня</h4>
          <div className="flex max-h-78.5 flex-col gap-4 overflow-auto pr-8">
            {TEAM_OF_DAY.map((item) => (
              <ContactiItem key={item.id} {...item} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const Component = AnalyticsPage;
