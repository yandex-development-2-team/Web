import type { ReactNode } from 'react';
import { Button } from '@/components/ui/Button';
import { EditPencilIcon, TrashIcon } from '@/assets/icons';
import { cn } from '@/utils';

type ProductCardProps = {
  label?: string;
  title: string;
  description?: string;
  image?: string;
  fallbackImage?: string;
  isActive?: boolean;
  activeLabel?: string;
  onOpen?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  className?: string;
  editLabel?: ReactNode;
  deleteLabel?: ReactNode;
};

export function ProductCard({
  label,
  title,
  description,
  image,
  fallbackImage,
  isActive,
  activeLabel,
  onOpen,
  onEdit,
  onDelete,
  className,
  editLabel,
  deleteLabel,
}: ProductCardProps) {
  const imageSrc = image ?? fallbackImage;

  const cardContent = (
    <div className="flex w-full flex-col gap-5">
      {label && (
        <p className="text-muted-foreground px-1 text-sm leading-5">{label}</p>
      )}

      <div className="relative overflow-hidden rounded-3xl">
        {imageSrc ? (
          <img
            src={imageSrc}
            alt={title}
            loading="lazy"
            onError={(e) => {
              if (fallbackImage) {
                e.currentTarget.onerror = null;
                e.currentTarget.src = fallbackImage;
              }
            }}
            className={cn(
              'h-44 w-full object-cover',
              onOpen &&
                'transition-transform duration-300 group-hover:scale-[1.02]',
            )}
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-44 w-full items-center justify-center rounded-3xl border border-dashed border-black/10">
            <span className="px-4 text-center text-sm font-medium">
              Изображение отсутствует
            </span>
          </div>
        )}

        {typeof isActive === 'boolean' && (
          <span
            className={cn(
              'absolute top-6 right-10 rounded-sm px-3 py-1.5 text-xs font-semibold shadow-sm sm:top-5 sm:right-14 sm:px-4 sm:py-2 sm:text-sm md:top-4 md:right-14 lg:top-8 lg:right-8 xl:top-4 xl:right-12',
              isActive
                ? 'bg-accent text-foreground'
                : 'bg-border text-foreground',
            )}
          >
            {activeLabel ?? (isActive ? 'Активен в боте' : 'Не активен в боте')}
          </span>
        )}
      </div>

      <div className="min-w-0 space-y-3 px-1">
        <h3 className="text-[clamp(1.375rem,4vw,2rem)] leading-tight font-semibold text-balance break-words">
          {title}
        </h3>
        <p className="text-foreground/85 min-h-[4.5rem] text-sm leading-6 text-pretty break-words sm:text-base sm:leading-7">
          {description ?? 'Описание продукта пока не добавлено.'}
        </p>
      </div>
    </div>
  );

  return (
    <article
      className={cn(
        'bg-card overflow-hidden rounded-3xl border border-black/5 shadow-[0_22px_50px_-28px_rgba(24,24,24,0.28)]',
        className,
      )}
    >
      {onOpen ? (
        <Button
          type="button"
          variant="ghost"
          className="group block h-auto w-full rounded-none p-6 text-left hover:bg-transparent"
          onClick={onOpen}
        >
          {cardContent}
        </Button>
      ) : (
        <div className="group flex flex-col gap-5 p-6">{cardContent}</div>
      )}

      <div className="border-border/70 flex items-center justify-between border-t px-6 py-5">
        <Button
          type="button"
          variant="default-primary"
          className="text-foreground h-12 w-1/3"
          onClick={onEdit}
          aria-label={`Редактировать ${title}`}
        >
          {editLabel ?? <EditPencilIcon />}
        </Button>

        <Button
          type="button"
          variant="default-secondary"
          className="text-foreground h-12 w-1/3"
          onClick={onDelete}
          aria-label={`Удалить ${title}`}
        >
          {deleteLabel ?? <TrashIcon />}
        </Button>
      </div>
    </article>
  );
}
