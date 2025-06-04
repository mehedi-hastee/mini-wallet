import { useContext, useEffect, useState, useCallback } from "react";
import { AuthContext } from "@contexts/AuthContext/AuthContext";
import { fetchTransactionHistory } from "@services/api";
import type { SortTypes, Transaction } from "@types";
import { GENERIC_ERROR_MESSAGE, PAGE_SIZE } from "@constants/transaction.constants";

/**
 * Hook para manejar el historial de transacciones con paginación y orden desde el backend.
 */
const useTransactionHistory = () => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("AuthContext is undefined. Make sure you are within an AuthProvider.");
  }

  const { user } = authContext;

  if (!user) {
    throw new Error("User is undefined. Make sure you are logged in.");
  }

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<SortTypes>("desc" as SortTypes);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTransactions = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      // Ahora fetchTransactionHistory acepta paginación y orden
      const result = await fetchTransactionHistory(user, { page, pageSize: PAGE_SIZE, sortOrder });
      if (result && Array.isArray(result.transactions)) {
        setTransactions(result.transactions);
        setTotalPages(result.totalPages || 1);
      } else {
        setError(GENERIC_ERROR_MESSAGE);
      }
    } catch (err) {
      console.error(err);
      setError(GENERIC_ERROR_MESSAGE);
    } finally {
      setLoading(false);
    }
  }, [user, page, sortOrder]);

  useEffect(() => {
    loadTransactions();
  }, [loadTransactions]);

  return {
    transactions,
    loading,
    error,
    sortOrder,
    setSortOrder,
    totalPages,
    page,
    setPage,
  };
};

export default useTransactionHistory;