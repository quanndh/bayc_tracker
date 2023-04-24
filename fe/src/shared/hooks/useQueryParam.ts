import { useLocation } from 'react-router-dom';
import { useMemo } from 'react';

export function useQueryParam(name: string) {
  const { search } = useLocation();
  const data = useMemo(() => new URLSearchParams(search), [search]);
  return useMemo(() => data.get(name), [name, data]);
}
