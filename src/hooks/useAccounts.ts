import { useCallback, useEffect, useState } from 'react';

import type { Account } from '../models/Account';
import { getAccounts } from '../services/accountService';

interface UseAccountsResult {
  accounts: Account[];
  isLoading: boolean;
  isRefreshing: boolean;
  error: string | null;
  refresh: () => Promise<void>;
  retry: () => Promise<void>;
}

export function useAccounts(): UseAccountsResult {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAccounts = useCallback(async (refreshing = false) => {
    refreshing ? setIsRefreshing(true) : setIsLoading(true);
    setError(null);

    try {
      const result = await getAccounts();
      setAccounts(result);
    } catch (requestError: unknown) {
      const message =
        requestError instanceof Error ? requestError.message : 'Ocurrió un error inesperado.';

      setError(message);
    } finally {
      refreshing ? setIsRefreshing(false) : setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchAccounts();
  }, [fetchAccounts]);

  const refresh = useCallback(async () => {
    await fetchAccounts(true);
  }, [fetchAccounts]);

  const retry = useCallback(async () => {
    await fetchAccounts(false);
  }, [fetchAccounts]);

  return {
    accounts,
    isLoading,
    isRefreshing,
    error,
    refresh,
    retry,
  };
}
