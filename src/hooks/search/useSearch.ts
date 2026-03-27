import { useEffect, useRef, useState } from 'react';

type UseSearchProps<T> = {
  debounceMs: number;
  minSearchLength: number;
  onSearch: (query: string) => Promise<T[]> | T[];
  onResult?: (results: T[], query: string) => void;
  onSelect?: (item: T | null) => void;
  getOptionLabel: (item: T) => string;
};

export function useSearch<T>({
  debounceMs,
  minSearchLength,
  onSearch,
  onResult,
  onSelect,
  getOptionLabel,
}: UseSearchProps<T>) {
  const requestIdRef = useRef(0);

  const [query, setQuery] = useState('');
  const [results, setResults] = useState<T[]>([]);
  const [selectedItem, setSelectedItem] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);

  useEffect(() => {
    if (selectedItem) return;

    const normalizedQuery = query.trim();

    if (normalizedQuery.length < minSearchLength) {
      setResults([]);
      setHighlightedIndex(-1);
      setIsLoading(false);
      setHasSearched(false);
      onResult?.([], normalizedQuery);
      return;
    }

    const requestId = ++requestIdRef.current;
    setIsLoading(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const nextResults = await onSearch(normalizedQuery);

        if (requestId !== requestIdRef.current) return;

        setResults(nextResults);
        setHighlightedIndex(nextResults.length > 0 ? 0 : -1);
        setHasSearched(true);
        onResult?.(nextResults, normalizedQuery);
      } catch {
        if (requestId !== requestIdRef.current) return;

        setResults([]);
        setHighlightedIndex(-1);
        setHasSearched(true);
        onResult?.([], normalizedQuery);
      } finally {
        if (requestId === requestIdRef.current) {
          setIsLoading(false);
        }
      }
    }, debounceMs);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [debounceMs, minSearchLength, onResult, onSearch, query, selectedItem]);

  const select = (item: T) => {
    setSelectedItem(item);
    setQuery(getOptionLabel(item));
    setResults([]);
    setHighlightedIndex(-1);
    setHasSearched(false);
    onSelect?.(item);
  };

  const resetSelection = () => {
    setSelectedItem(null);
    setResults([]);
    setHighlightedIndex(-1);
    setHasSearched(false);
    onSelect?.(null);
  };

  const clear = () => {
    setQuery('');
    setResults([]);
    setSelectedItem(null);
    setHighlightedIndex(-1);
    setIsLoading(false);
    setHasSearched(false);
    onSelect?.(null);
  };

  return {
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
  };
}
