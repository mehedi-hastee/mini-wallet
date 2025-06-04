import { EXCEEDS_BALANCE_ERROR, GENERIC_ERROR_MESSAGE, INAVLID_AMOUNT_ERROR } from "@constants/withdraw.constants";
import type { AuthContextType } from "@contexts/AuthContext/types";
import { withdraw } from "@services/api";
import type { IUseWithdrawForm } from "@types";
import { useCallback, useState } from "react";

const useWithdrawForm = (authContext:AuthContextType, currentBalance:number):IUseWithdrawForm => {
	const {user} = authContext;

	if (!user) {
		throw new Error('User is not authenticated. Please log in.');
	}

	const [amount, setAmount] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleWithdraw = useCallback(async (): Promise<boolean> => {
		if (Number(amount) > currentBalance) {
			setError(EXCEEDS_BALANCE_ERROR);
			return false;
		}

		setLoading(true);
		setError(null);

		if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
			setError(INAVLID_AMOUNT_ERROR);
			setLoading(false);
			return false;
		}

		try {
			const result = await withdraw(Number(amount), user);
			if(!result){
				setError(GENERIC_ERROR_MESSAGE);
			}
			return result
		} catch (err) {
			console.error(err);
			setError(GENERIC_ERROR_MESSAGE);
			return false;
		} finally {
			setAmount(null);
			setLoading(false);
		}
	}, [amount, currentBalance, user]);

	return {
		amount,
		setAmount,
		handleWithdraw,
		error,
		loading,
	}
}

export default useWithdrawForm;