import { useCallback, useContext } from "react";
import styles from './Menu.module.css';
import { useNavigate } from "react-router-dom";
import { AuthContext } from "@contexts/AuthContext/AuthContext";
import { ROUTES } from "@constants/routes.constants";

const Menu: React.FC = () => {
	const authContext = useContext(AuthContext);
	const navigation = useNavigate();

	if (!authContext) {
		throw new Error('AuthContext is undefined. Make sure you are within an AuthProvider.');
	}

	const { logout } = authContext;

	const handleWithdraw = useCallback(() => {
		navigation(ROUTES.WITHDRAW);
	}, [navigation]);

	const handleLogout = useCallback(() => {
		logout();
	}, [logout]);

	return (
		<div className={styles.menu}>
			<p className={styles.link} onClick={handleWithdraw}>Withdraw</p>
			<p className={styles.link} onClick={handleLogout}>Logout</p>
		</div>
	);
}

export default Menu;