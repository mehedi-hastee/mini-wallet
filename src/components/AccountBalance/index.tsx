import React from "react";
import useBalance from "./useBalance";
import styles from "./AccountBalance.module.css";

const AccountBalance: React.FC = React.memo(() => {
  const { balance, error, loading } = useBalance();

  if (loading) return <div>Loading...</div>;
  if (error) return <div role="alert">{error}</div>;

  return (
    <div>
      <h2>Account Balance</h2>
      <p className={styles.balance}>{balance.toFixed(2)}$</p>
    </div>
  );
});

export default AccountBalance;