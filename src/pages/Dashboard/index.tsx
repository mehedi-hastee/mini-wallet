import AccountBalance from "@components/AccountBalance";
import Menu from "@components/Menu";
import TransactionHistory from "@components/TransactionHistory";

const Dashboard: React.FC = () => {
 return (
    <div>
      <Menu />
      <AccountBalance />
      <TransactionHistory />
    </div>
  );
}

export default Dashboard;