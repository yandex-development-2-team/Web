import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentProps,
  type KeyboardEvent,
  type ReactNode,
} from 'react';

import { Input } from '@/components/ui/Input';
import { Label } from '@/components/ui/Label';
import { CloseIcon, SearchIcon } from '@/assets/icons';
import { useSearch } from '@/hooks';
import { cn } from '@/utils';

type InputSearchOption = {
  id: string;
  label: string;
  description?: string;
};

type InputSearchProps<T extends InputSearchOption = InputSearchOption> = Omit<
  ComponentProps<typeof Input>,
  'type' | 'value' | 'onChange' | 'label'
> & {
  label?: string;
  debounceMs?: number;
  minSearchLength?: number;
  emptyText?: string;
  searchingText?: string;
  onSearch: (query: string) => Promise<T[]> | T[];
  onResult?: (results: T[], query: string) => void;
  onSelect?: (item: T | null) => void;
  getOptionKey?: (item: T) => string;
  getOptionLabel?: (item: T) => string;
  getOptionDescription?: (item: T) => string | undefined;
  renderOption?: (item: T, state: { isSelected: boolean }) => ReactNode;
};

export function InputSearch<T extends InputSearchOption = InputSearchOption>({
  id,
  label,
  className,
  placeholder = '',
  debounceMs = 300,
  minSearchLength = 1,
  emptyText = 'Ничего не найдено',
  searchingText = 'Идет поиск...',
  disabled,
  onSearch,
  onResult,
  onSelect,
  getOptionKey = (item) => item.id,
  getOptionLabel = (item) => item.label,
  getOptionDescription = (item) => item.description,
  renderOption,
  ...props
}: InputSearchProps<T>) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const listboxId = `${inputId}-listbox`;
  const rootRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const {
    query,
    setQuery,
    results,
    selectedItem,
    isLoading,
    hasSearched,
    highlightedIndex,
    setHighlightedIndex,
    select,
    resetSelection,
    clear,
  } = useSearch<T>({
    debounceMs,
    minSearchLength,
    onSearch,
    onResult,
    onSelect,
    getOptionLabel,
  });

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (selectedItem) {
      const isPrintableKey =
        event.key.length === 1 &&
        !event.altKey &&
        !event.ctrlKey &&
        !event.metaKey;

      if (isPrintableKey) {
        resetSelection();
        return;
      }

      if (event.key === 'Backspace' || event.key === 'Delete') {
        event.preventDefault();
        clear();
        setIsOpen(true);
        return;
      }
    }

    if (!isOpen || isLoading || results.length === 0) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setHighlightedIndex((prev) => (prev + 1) % results.length);
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setHighlightedIndex((prev) =>
        prev <= 0 ? results.length - 1 : prev - 1,
      );
    }

    if (event.key === 'Enter' && highlightedIndex >= 0) {
      event.preventDefault();
      select(results[highlightedIndex]);
    }

    if (event.key === 'Escape') {
      setIsOpen(false);
    }
  };

  const showDropdown =
    isOpen &&
    !selectedItem &&
    query.trim().length >= minSearchLength &&
    (isLoading || hasSearched);
  const activeDescendantId =
    highlightedIndex >= 0 ? `${listboxId}-option-${highlightedIndex}` : undefined;

  return (
    <div ref={rootRef} className="relative w-full">
      {label && (
        <Label htmlFor={inputId} className="mb-1 inline-flex">
          {label}
        </Label>
      )}

      <div className="relative">
        <SearchIcon className="text-muted-foreground pointer-events-none absolute top-1/2 left-3 z-10 size-5 -translate-y-1/2" />

        <Input
          {...props}
          id={inputId}
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={showDropdown}
          aria-controls={showDropdown ? listboxId : undefined}
          aria-activedescendant={showDropdown ? activeDescendantId : undefined}
          disabled={disabled}
          value={query}
          placeholder={placeholder}
          className={cn('pr-10 pl-10', className)}
          onFocus={() => {
            if (!selectedItem && query.trim().length >= minSearchLength) {
              setIsOpen(true);
            }
          }}
          onChange={(event) => {
            if (selectedItem) {
              resetSelection();
            }

            setQuery(event.target.value);
            setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
        />

        {(query || selectedItem) && (
          <button
            type="button"
            onClick={clear}
            aria-label="Очистить поиск"
            className="text-muted-foreground hover:text-foreground absolute top-1/2 right-3 z-10 -translate-y-1/2 transition-colors"
          >
            <CloseIcon className="size-5" />
          </button>
        )}
      </div>

      {showDropdown && (
        <div className="bg-card border-border absolute top-full right-0 left-0 z-20 mt-2 overflow-hidden rounded-lg border shadow-lg">
          <ul id={listboxId} role="listbox" className="max-h-72 overflow-y-auto py-1">
            {isLoading ? (
              <li className="text-muted-foreground px-4 py-3 text-sm">
                {searchingText}
              </li>
            ) : results.length === 0 ? (
              <li className="text-muted-foreground px-4 py-3 text-sm">
                {emptyText}
              </li>
            ) : (
              results.map((item, index) => {
                const optionKey = getOptionKey(item);
                const optionLabel = getOptionLabel(item);
                const optionDescription = getOptionDescription(item);
                const isHighlighted = index === highlightedIndex;

                return (
                  <li
                    key={optionKey}
                    id={`${listboxId}-option-${index}`}
                    role="option"
                    aria-selected={isHighlighted}
                  >
                    <button
                      type="button"
                      className={cn(
                        'hover:bg-secondary flex w-full flex-col items-start gap-1 px-4 py-3 text-left transition-colors',
                        isHighlighted && 'bg-secondary',
                      )}
                      onMouseEnter={() => setHighlightedIndex(index)}
                      onMouseDown={(event) => {
                        event.preventDefault();
                        select(item);
                      }}
                    >
                      {renderOption ? (
                        renderOption(item, { isSelected: isHighlighted })
                      ) : (
                        <>
                          <span className="text-foreground text-sm font-semibold">
                            {optionLabel}
                          </span>
                          {optionDescription && (
                            <span className="text-muted-foreground text-sm">
                              {optionDescription}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  </li>
                );
              })
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
