import { fetchAccountBalance } from "@services/api";
import { AuthContext } from "@contexts/AuthContext/AuthContext";
import { useCallback, useContext, useEffect, useState } from "react";
const useBalance = () => {
	const authContext = useContext(AuthContext);

	if (!authContext) {
		throw new Error('AuthContext is undefined. Make sure you are within an AuthProvider.');
	}

	const { user } = authContext;

	if (!user) {
		throw new Error('User is undefined. Make sure you are logged in.');
	}

	const [balance, setBalance] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(true);
	const [error, setError] = useState<string | null>(null);

	const fetchBalance = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			const result = await fetchAccountBalance(user);
			if (typeof result === "number") {
				setBalance(result);
			} else {
				setError("No se pudo obtener el saldo. Intenta nuevamente.");
			}
		} catch (err) {
			console.error(err);
			setError("Error al obtener el saldo. Intenta más tarde.");
		} finally {
			setLoading(false);
		}
	}, [user]);

	useEffect(() => {
		fetchBalance();
	}, [fetchBalance]);

	return {
		balance,
		loading,
		error,
	}
}

export default useBalance;