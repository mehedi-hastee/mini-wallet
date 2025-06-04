import { TransactionTypeEnum, type FetchTransactionHistoryParams, type Transaction } from "@types";
import { getBalances, getTransactions, getUsers, setBalances, setTransactions, setUsers } from "./apiFakeData";

export const fetchLogin = async (
  username: string,
  password: string
): Promise<string | false> => {
  await new Promise((res) => setTimeout(res, 500));

  if (!username || !password) return false;

  if(username === 'fail') return false; // Simulate a failure for testing purposes

  const users = getUsers();

  if (!users[username] || users[username].password !== password) return false;

  return username;
};

export const register = async (
  username: string,
  password: string
): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 500));

  if (!username || !password) return false;

  if(username === 'fail') return false; // Simulate a failure for testing purposes

  const users = getUsers();

  if (users[username]) return false;

  users[username] = { password };
  setUsers(users);

  const balances = getBalances();
  balances[username] = 1000;
  setBalances(balances);

  const transactions = getTransactions();

  const fakeTransactions: Transaction[] = [
    {
      id: (Date.now() - 300000).toString(),
      date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      amount: 500,
      type: TransactionTypeEnum.DEPOSIT,
      description: "Welcome bonus",
    },
    {
      id: (Date.now() - 200000).toString(),
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
      amount: 500,
      type: TransactionTypeEnum.DEPOSIT,
      description: "First deposit",
    },
  ];

  transactions[username] = fakeTransactions;
  setTransactions(transactions);

  return true;
};

export const fetchAccountBalance = async (
  token: string
): Promise<number | false> => {
  await new Promise((res) => setTimeout(res, 300));

  if (!token) return false;
  
  const balances = getBalances();
  return balances[token] ?? false;
};

export const fetchTransactionHistory = async (
  token: string,
  params: FetchTransactionHistoryParams
): Promise<{ transactions: Transaction[]; totalPages: number } | false> => {
  await new Promise((res) => setTimeout(res, 300));

  if (!token) return false;

  const allTransactions = getTransactions()[token] || [];
  const sortOrder = params?.sortOrder ?? "desc";
  const sorted = [...allTransactions].sort((a, b) => {
    if (sortOrder === "desc") {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const pageSize = params?.pageSize ?? 5;
  const page = params?.page ?? 1;
  const totalPages = Math.ceil(sorted.length / pageSize);
  const start = (page - 1) * pageSize;
  const end = start + pageSize;
  const paginated = sorted.slice(start, end);

  return {
    transactions: paginated,
    totalPages,
  };
};

export const withdraw = async (
  amount: number,
  token: string
): Promise<boolean> => {
  await new Promise((res) => setTimeout(res, 500));

  if (!token || amount <= 0) return false;

  const balances = getBalances();
  if ((balances[token] ?? 0) < amount) return false;

  balances[token] -= amount;
  setBalances(balances);

  const transactions = getTransactions();
  const currentTransaction: Transaction = {
    id: Date.now().toString(),
    date: new Date().toISOString().slice(0, 10),
    amount: -amount,
    type: TransactionTypeEnum.WITHDRAWAL,
    description: "Withdrawal",
  };
  transactions[token] = [currentTransaction, ...(transactions[token] || [])];
  setTransactions(transactions);

  return true;
};