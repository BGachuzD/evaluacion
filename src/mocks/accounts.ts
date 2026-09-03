import type { Account } from '../models/Account';

export const MOCK_ACCOUNTS: readonly Account[] = [
  { id: 1, number: '4152 3138 0091 2277', type: 'Cuenta de nómina', balance: 18450.75 },
  { id: 2, number: '4815 6623 4210 8834', type: 'Cuenta de ahorro', balance: 132980.4 },
  { id: 3, number: '5579 0041 7788 1902', type: 'Cuenta corriente', balance: 7320 },
  { id: 4, number: '3782 8224 6310 0055', type: 'Tarjeta de crédito', balance: -9865.32 },
  { id: 5, number: '6011 4470 2251 6690', type: 'Inversión a plazo', balance: 250000 },
  { id: 6, number: '4152 9987 1123 4410', type: 'Cuenta en dólares', balance: 4210.09 },
  { id: 7, number: '4152 3138 0091 2277', type: 'Cuenta de nómina', balance: 18450.75 },
  { id: 8, number: '4815 6623 4210 8834', type: 'Cuenta de ahorro', balance: 132980.4 },
  { id: 9, number: '5579 0041 7788 1902', type: 'Cuenta corriente', balance: 7320 },
  { id: 10, number: '3782 8224 6310 0055', type: 'Tarjeta de crédito', balance: -9865.32 },
  { id: 11, number: '6011 4470 2251 6690', type: 'Inversión a plazo', balance: 250000 },
  { id: 12, number: '4152 9987 1123 4410', type: 'Cuenta en dólares', balance: 4210.09 },
];

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
