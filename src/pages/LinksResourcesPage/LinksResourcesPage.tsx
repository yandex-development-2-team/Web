import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { DeleteModal } from '@/components/ui/Modal';
import { cn } from '@/utils';
import { useLinksManager } from './useLinksManager';
import type { LinkSection, LinkItem } from './types';

const LinksResourcesPage = () => {
  const {
    register,
    handleSubmit,
    deleteModal,
    newLinks,
    setNewLinks,
    usefulLinksFields,
    faqLinksFields,
    partnerRelationsFields,
    handleAddLink,
    handleRemoveLink,
    onSubmit,
    handleDeleteOrganizationInfo,
    closeDeleteModal,
  } = useLinksManager();

  const linkStyle: React.CSSProperties = {
    fontFamily: "'Open Sans', sans-serif",
    fontWeight: 600,
    fontSize: '16px',
    lineHeight: '100%',
    color: '#353434',
    borderBottom: '1px solid #F4DB54',
    textDecoration: 'none',
    marginLeft: '10px',
    paddingBottom: '5px',
  };

  const renderLinksSection = (
    title: string,
    section: LinkSection,
    fields: LinkItem[],
  ) => (
    <section className={cn('bg-card rounded-lg p-5')}>
      <h2 className={cn('mb-5')}>{title}</h2>
      
      <div className={cn('mb-9')}>
        <div className={cn('flex items-end gap-5')}>
          <div className={cn('flex-1 space-y-5')}>
            <div>
              <label className={cn('mb-1 block text-xs text-[#8B8C8B]')}>Название</label>
              <Input
                value={newLinks[section].title}
                onChange={(e) => setNewLinks(prev => ({
                  ...prev,
                  [section]: { ...prev[section], title: e.target.value }
                }))}
                placeholder="Название"
                className={cn('w-[805px]')}
              />
            </div>
            <div>
              <label className={cn('mb-1 block text-xs text-[#8B8C8B]')}>URL</label>
              <Input
                value={newLinks[section].url}
                onChange={(e) => setNewLinks(prev => ({
                  ...prev,
                  [section]: { ...prev[section], url: e.target.value }
                }))}
                placeholder="Ссылка"
                className={cn('w-[805px]')}
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={() => handleAddLink(section)}
            className={cn('h-[46px] w-[196px] p-0')}
          >
            Загрузить
          </Button>
        </div>
      </div>

      {fields.length > 0 && (
        <div className={cn('flex flex-col gap-2')}>
          {fields.map((field, index) => (
            <div key={field.id} className={cn('flex items-center gap-2')}>
              <a
                href={field.url}
                target="_blank"
                rel="noopener noreferrer"
                style={linkStyle}
              >
                {field.title}
              </a>
              <button
                type="button"
                onClick={() => handleRemoveLink(section, index)}
                className={cn('text-gray-400 hover:text-gray-600')}
              >
                <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                  <path d="M5 5L15 15M5 15L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>
          ))}
        </div>
      )}
    </section>
  );

  return (
    <div className={cn('flex h-full flex-col gap-5')}>
      <form onSubmit={handleSubmit(onSubmit)} className={cn('flex flex-col gap-5')}>
        <section className={cn('bg-card rounded-lg p-5')}>
          <h2 className={cn('mb-5')}>Информация об организации</h2>
          <div className={cn('mb-4')}>
            <label className={cn('mb-1 block text-xs text-[#8B8C8B]')}>Текст</label>
            <Textarea
              {...register('organizationInfo')}
              placeholder="Введите текст..."
              className={cn('h-[60px] w-full')}
            />
          </div>
          <div className={cn('flex justify-end gap-3')}>
            <Button
              type="button"
              variant="default-secondary"
              onClick={() => deleteModal.onConfirm = handleDeleteOrganizationInfo}
              className={cn('w-[196px] border-[#F4DB54]')}
            >
              Удалить
            </Button>
            <Button type="submit" className={cn('w-[196px]')}>
              Сохранить
            </Button>
          </div>
        </section>

        {renderLinksSection('Полезные ссылки', 'usefulLinks', usefulLinksFields)}
        {renderLinksSection('FAQ', 'faqLinks', faqLinksFields)}
        {renderLinksSection('Афиша Partner Relations', 'partnerRelationsLinks', partnerRelationsFields)}
      </form>

      <DeleteModal
        isOpen={deleteModal.isOpen}
        onClose={closeDeleteModal}
        onConfirm={deleteModal.onConfirm}
        itemId=""
        deletePath=""
      />
    </div>
  );
};

export const Component = LinksResourcesPage;