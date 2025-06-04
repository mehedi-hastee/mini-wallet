import { EMPTY_FIELDS_MESSAGE, GENERIC_MESSAGE } from "@constants/register.constants";
import { register } from "@services/api";
import type { IUseRegisterForm } from "@types";
import { useCallback, useState } from "react";

const useRegisterForm = ():IUseRegisterForm => {
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleRegister = useCallback(async () => {
		setError(null);
		setLoading(true);

		try {
			if (!username || !password) {
				setError(EMPTY_FIELDS_MESSAGE);
				setLoading(false);
				return false;
			}
			
			const registered = await register(username, password);
			if (registered) {
				return true;
			}
			
			setError(GENERIC_MESSAGE);
			return false;
		} catch (err) {
			console.error(err);
			setError(GENERIC_MESSAGE);
			return false;
		} finally {
			setLoading(false);
		}
	}, [username, password]);

	return {
		username,
		setUsername,
		password,
		setPassword,
		error,
		handleRegister,
		loading,
	}
}

export default useRegisterForm;