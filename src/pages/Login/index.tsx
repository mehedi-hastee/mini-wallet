import { ROUTES } from '@constants/routes.constants';
import { AuthContext } from '@contexts/AuthContext/AuthContext';
import useLoginForm from '@hooks/useLoginForm';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  if (!authContext) {
    throw new Error('AuthContext is undefined. Make sure you are within an AuthProvider.');
  }

  const { 
    username, 
    setUsername, 
    password, 
    setPassword, 
    error, 
    loading, 
    handleSubmit 
  } = useLoginForm(authContext, navigate);

  const handleSubmitLocal = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit();
  }

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmitLocal}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitLocal(e);
              }
            }}
            required
            disabled={loading}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                handleSubmitLocal(e);
              }
            }}
            required
            disabled={loading}
          />
        </div>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
      <p>Don't have an account? <Link to={ROUTES.REGISTER}>Register here</Link></p>
    </div>
  );
};

export default Login;