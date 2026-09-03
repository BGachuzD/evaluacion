import {
  API_BASE_URL,
  API_TIMEOUT_MS,
  MOCK_LATENCY_MS,
  MOCK_SCENARIO,
  USE_MOCK_API,
} from '../config/api';
import { delay, MOCK_ACCOUNTS } from '../mocks/accounts';
import type { Account } from '../models/Account';

export class ApiError extends Error {
  constructor(
    message: string,
    public readonly status?: number
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export function getAccounts(): Promise<Account[]> {
  return USE_MOCK_API ? getMockAccounts() : fetchAccounts();
}

async function getMockAccounts(): Promise<Account[]> {
  await delay(MOCK_LATENCY_MS);

  if (MOCK_SCENARIO === 'error') {
    throw new ApiError('Mock: el servicio no está disponible.', 503);
  }

  if (MOCK_SCENARIO === 'empty') {
    return [];
  }

  return MOCK_ACCOUNTS.map((account) => ({ ...account }));
}

async function fetchAccounts(): Promise<Account[]> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), API_TIMEOUT_MS);

  try {
    const response = await fetch(`${API_BASE_URL}/api/accounts`, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
      signal: controller.signal,
    });

    if (!response.ok) {
      throw new ApiError(`El servicio respondió con HTTP ${response.status}`, response.status);
    }

    const data: unknown = await response.json();

    if (!Array.isArray(data)) {
      throw new ApiError('La respuesta del servicio no tiene el formato esperado.');
    }

    return data as Account[];
  } catch (error: unknown) {
    if (error instanceof ApiError) {
      throw error;
    }

    if (error instanceof Error && error.name === 'AbortError') {
      throw new ApiError('La solicitud tardó demasiado tiempo. Intenta nuevamente.');
    }

    throw new ApiError('No fue posible consultar las cuentas. Verifica tu conexión.');
  } finally {
    clearTimeout(timeoutId);
  }
}
