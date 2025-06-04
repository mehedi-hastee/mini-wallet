import { TransactionTypeEnum } from "@types";

export const TransactionTypeLabels: Record<TransactionTypeEnum, string> = {
  [TransactionTypeEnum.DEPOSIT]: 'Deposit',
  [TransactionTypeEnum.WITHDRAWAL]: 'Withdrawal',
};

export const GENERIC_ERROR_MESSAGE = "Failed to fetch transaction history";
export const PAGE_SIZE = 5;