export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL ?? '';
export const API_TIMEOUT_MS = 10_000;

export const USE_MOCK_API = process.env.EXPO_PUBLIC_USE_MOCK === 'true' || API_BASE_URL === '';

export type MockScenario = 'success' | 'empty' | 'error';

const SCENARIOS: readonly MockScenario[] = ['success', 'empty', 'error'];

function parseScenario(value: string | undefined): MockScenario {
  return SCENARIOS.includes(value as MockScenario) ? (value as MockScenario) : 'success';
}

function parseLatency(value: string | undefined): number {
  const parsed = Number(value);
  return Number.isFinite(parsed) && parsed >= 0 ? parsed : 600;
}

export const MOCK_SCENARIO = parseScenario(process.env.EXPO_PUBLIC_MOCK_SCENARIO);
export const MOCK_LATENCY_MS = parseLatency(process.env.EXPO_PUBLIC_MOCK_LATENCY_MS);
