import React, { useCallback } from "react";
import useTransactionHistory from "./useTransactionHistory";
import styles from "./Transaction.module.css";
import { SortTypes, TransactionTypeEnum } from "@types";
import { formatDate } from "@tools/date";
import { TransactionTypeLabels } from "@constants/transaction.constants";

const TransactionHistory: React.FC = () => {
  const {
    error,
    loading,
    setSortOrder,
    sortOrder,
    setPage,
    page,
    totalPages,
    transactions
  } = useTransactionHistory();

  const handleSort = useCallback((e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value as SortTypes)
  }, [setSortOrder]);

  const handlePrev = () => setPage((p) => Math.max(1, p - 1));
  const handleNext = () => setPage((p) => Math.min(totalPages, p + 1));

  const renderTransactions = useCallback(() => {
    if (transactions.length === 0) {
      return <p>No transactions found.</p>;
    }
    return <ul className={styles.transactionList}>
      {transactions.map((transaction) => (
        <li key={transaction.id} className={styles.transactionItem}>
          {TransactionTypeLabels[transaction.type]} on {formatDate(transaction.date)}:{" "}
          <strong
            className={
              transaction.type === TransactionTypeEnum.WITHDRAWAL
                ? styles.red
                : styles.green
            }
          >
            {transaction.amount} EUR
          </strong>
        </li>
      ))}
    </ul>;
  }, [transactions]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h2>Transaction History</h2>
      <div style={{ marginBottom: "1rem" }}>
        <label>
          Sort by date:{" "}
          <select
            value={sortOrder}
            onChange={handleSort}
            className={styles.sortSelector}
          >
            <option value="desc">Latest first</option>
            <option value="asc">Oldest first</option>
          </select>
        </label>
      </div>
      {renderTransactions()}
      <div style={{ marginTop: "1rem", display: "flex", gap: 8, alignItems: "center" }}>
        <button className={styles.paginationButton} onClick={handlePrev} disabled={page === 1}>
          ←
        </button>
        <span>
          Page {page} of {totalPages}
        </span>
        <button className={styles.paginationButton} onClick={handleNext} disabled={page === totalPages || totalPages === 0}>
          →
        </button>
      </div>
    </div>
  );
};

export default TransactionHistory;