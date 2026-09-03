import type { Account } from '../models/Account';

export type RootStackParamList = {
  Accounts: undefined;
  AccountDetail: {
    account: Account;
  };
};
