import { getPersistedData, persistData } from "@tools/persistency";
import type { Transaction } from "@types";

const USERS_KEY = "wallet_users";
const BALANCES_KEY = "wallet_balances";
const TRANSACTIONS_KEY = "wallet_transactions";

export const getUsers = (): Record<string, { password: string }> => {
	return JSON.parse(getPersistedData(USERS_KEY) || "{}");
}
export const setUsers = (users: Record<string, { password: string }>) => {
	persistData(USERS_KEY, JSON.stringify(users))
}

export const getBalances = (): Record<string, number> => {
	return JSON.parse(getPersistedData(BALANCES_KEY) || "{}");
}
export const setBalances = (balances: Record<string, number>) => {
	persistData(BALANCES_KEY, JSON.stringify(balances));
}

export const getTransactions = (): Record<string, Transaction[]> => {
	return JSON.parse(getPersistedData(TRANSACTIONS_KEY) || "{}");
}

export const setTransactions = (transactions: Record<string, Transaction[]>) => {
	persistData(TRANSACTIONS_KEY, JSON.stringify(transactions));
}