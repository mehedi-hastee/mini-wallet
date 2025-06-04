import useBalance from '@components/AccountBalance/useBalance';
import { ROUTES } from '@constants/routes.constants';
import useAuth from '@hooks/useAuth';
import useWithdrawForm from '@hooks/useWithdrawForm';
import { useNavigate } from 'react-router-dom';
import styles from '@components/Menu/Menu.module.css'
import localStyles from './WithdrawForm.module.css';
import { useCallback } from 'react';

const WithdrawForm: React.FC = () => {
  const authContext = useAuth();
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext is undefined. Make sure you are within an AuthProvider.');
  }

  const {
    balance, 
    error: balanceError,
    loading: balanceLoading
  } = useBalance();
  const { 
    amount, 
    error, 
    handleWithdraw, 
    setAmount, 
    loading 
  } = useWithdrawForm(authContext, balance);

  const goBack = useCallback(() => {
    navigate(ROUTES.DASHBOARD);
  }, [navigate]);

  const handleWithdrawLocal = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    const result = await handleWithdraw();
    if(result){
      alert('Withdrawal successful');
      navigate(ROUTES.DASHBOARD);
    }
  }, [handleWithdraw, navigate]);

  if(!balanceLoading && balance === 0) {
    return (
      <div>
        <p className={styles.link} onClick={goBack}>Go back</p>
        <h2>No funds available for withdrawal</h2>
        <p>Your current balance is: {balance.toFixed(2)}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleWithdrawLocal} className={localStyles.withdrawForm}>
      <p className={styles.link} onClick={goBack}>Go back</p>
      <h2>Withdraw Funds</h2>
      <p>Your current balance is: {balanceLoading ? 'Loading balance...' : balance.toFixed(2)}$</p>
      <input
        type="number"
        value={amount ?? ''}
        onChange={(e) => setAmount(+e.target.value)}
        disabled={loading}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            handleWithdrawLocal(e);
          }
        }}
        required
        min={0}
        max={balance.toFixed(2)}
        placeholder="Enter amount"
      />
      {
        amount ? <p>Your new balance will be {(balance - amount).toFixed(2)}$</p> : <></>
      }
      <button type="submit" disabled={loading || balanceLoading || !balance || !!balanceError}>{loading ? 'Withdrawing...' : 'Withdraw' }</button>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
  );
};

export default WithdrawForm;