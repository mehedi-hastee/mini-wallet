import { EMPTY_FIELDS_ERROR_MESSAGE, GENERIC_ERROR_MESSAGE } from '@constants/login.constants';
import { ROUTES } from '@constants/routes.constants';
import type { AuthContextType } from '@contexts/AuthContext/types';
import type { IUseLoginForm } from '@types';
import { useCallback, useState } from 'react';

const useLoginForm = (authContext: AuthContextType, navigate: (route: string) => void):IUseLoginForm => {
	const { login } = authContext;
	const [username, setUsername] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const [error, setError] = useState<string | null>(null);
	const [loading, setLoading] = useState<boolean>(false);

	const handleSubmit = useCallback(async () => {
		setLoading(true);
		setError(null);
		try {
			if (!username || !password) {
				setError(EMPTY_FIELDS_ERROR_MESSAGE);
				setLoading(false);
				return;
			}
			const logged = await login(username, password);
			if (logged) {
				navigate(ROUTES.DASHBOARD);
			} else {
				setError(GENERIC_ERROR_MESSAGE);
			}
		} catch (err) {
			console.error(err);
			setError(GENERIC_ERROR_MESSAGE);
		} finally {
			setLoading(false);
		}
	}, [login, navigate, password, username]);

	return {
		username,
		setUsername,
		password,
		setPassword,
		error,
		loading,
		handleSubmit,
	};
}

export default useLoginForm;