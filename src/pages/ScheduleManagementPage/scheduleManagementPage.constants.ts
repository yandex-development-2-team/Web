export type TabId = 'table' | 'calendar';

export type TabItem = {
  id: TabId;
  label: string;
};

export const TABS_SCHEDULE_ID: Record<TabId, TabId> = {
  table: 'table',
  calendar: 'calendar',
};

export const TABS_SCHEDULE: TabItem[] = [
  { id: 'table', label: 'Таблица' },
  { id: 'calendar', label: 'Календарь' },
];
