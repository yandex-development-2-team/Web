import { cn } from '@/utils';
import { SectionLayout } from './SectionLayout';
import { DescriptionForm } from './DescriptionForm';
import { ResourceForm } from './ResourceForm';

const LinksResourcesPage = () => {
  return (
    <div className={cn('flex h-full flex-col gap-5')}>
      <SectionLayout title="Информация об организации">
        <DescriptionForm
          onSubmit={(data) => console.log(data, 'desc from the page')}
        />
      </SectionLayout>
      <SectionLayout title="Полезные ссылки">
        <ResourceForm
          onSubmit={(data) => console.log(data, 'links from the page')}
        />
      </SectionLayout>
      <SectionLayout title="FAQ">
        <ResourceForm
          onSubmit={(data) => console.log(data, 'faq from the page')}
        />
      </SectionLayout>
      <SectionLayout title="Афиша Partner Relations">
        <ResourceForm
          onSubmit={(data) => console.log(data, 'afish from the page')}
        />
      </SectionLayout>
    </div>
  );
};

export const Component = LinksResourcesPage;
