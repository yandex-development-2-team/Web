import { cn } from '@/utils';
import { SectionLayout } from './SectionLayout';
import { DescriptionForm } from './DescriptionForm';
import { ResourceForm } from './ResourceForm';
import { ReasourceList } from './ResourceList';
import { MOCK_DATA } from '@/mock/linksResourcesPage.mock';

const LinksResourcesPage = () => {
  return (
    <div className={cn('flex h-full flex-col gap-5')}>
      <SectionLayout title="Информация об организации">
        <DescriptionForm />
      </SectionLayout>
      <SectionLayout title="Полезные ссылки">
        <ResourceForm />
        <ReasourceList items={MOCK_DATA.data.links} />
      </SectionLayout>
      <SectionLayout title="FAQ">
        <ResourceForm />
        <ReasourceList items={MOCK_DATA.data.faq} />
      </SectionLayout>
      <SectionLayout title="Афиша Partner Relations">
        <ResourceForm />
        <ReasourceList items={MOCK_DATA.data.afisha} />
      </SectionLayout>
    </div>
  );
};

export const Component = LinksResourcesPage;
