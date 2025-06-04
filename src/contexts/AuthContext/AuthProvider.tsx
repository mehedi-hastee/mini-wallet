import React, { useCallback, useMemo, useState } from 'react';
import { AuthContext } from './AuthContext';
import { getPersistedData, persistData } from '@tools/persistency';
import { fetchLogin } from '@services/api';

const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<string | null>(() => getPersistedData("token"));

   const login = useCallback(async (username: string, password: string) => {
    const token = await fetchLogin(username, password);
    if (token) {
      persistData("token", token);
      setUser(token);
      return true;
    }
    return false;
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setUser(null);
  }, []);

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;