export enum TransactionTypeEnum {
  DEPOSIT = 'deposit',
  WITHDRAWAL = 'withdrawal',
}

export type TransactionType = TransactionTypeEnum;

export interface Transaction {
  readonly id: string;
  readonly amount: number;
  readonly date: string;
  readonly type: TransactionType;
  readonly description?: string;
}

export interface IUseLoginForm {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string | null;
  loading: boolean;
  handleSubmit: () => Promise<void>;
}

export interface IUseRegisterForm {
  username: string;
  setUsername: (value: string) => void;
  password: string;
  setPassword: (value: string) => void;
  error: string | null;
  handleRegister: () => Promise<boolean>;
  loading: boolean;
}

export interface IUseWithdrawForm {
	amount: number | null;
	setAmount: (value: number | null) => void;
	handleWithdraw: () => Promise<boolean>;
	error: string | null;
	loading: boolean;
}

export enum SortTypes {
  ASC = "asc",
  DESC = "desc",
}

export interface IUseTransactionHistory {
  transactions: Transaction[];
  sortedTransactions: Transaction[];
  loading: boolean;
  error: string | null;
  sortOrder: "asc" | "desc";
  setSortOrder: (order: SortTypes) => void;
  totalPages: number;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}

export interface FetchTransactionHistoryParams {
  page?: number;
  pageSize?: number;
  sortOrder?: SortTypes;
}