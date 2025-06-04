import { ROUTES } from "@constants/routes.constants";
import useRegisterForm from "@hooks/useRegisterForm";
import { Link, useNavigate } from "react-router-dom";

const Register: React.FC = () => {
  const navigate = useNavigate();

  const {
    username,
    setUsername,
    password,
    setPassword,
    error,
    handleRegister,
    loading
  } = useRegisterForm();

  const handleRegisterLocal = async (e: React.FormEvent) => {
    e.preventDefault();
    const registered = await handleRegister();
    if(registered) {
      // Show alert now to dont waste time, this could be a modal or an alert message from a design system
      alert("Registration successful! You can now login.");
      navigate(ROUTES.LOGIN);
    }
  }

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleRegisterLocal}>
        <div>
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleRegisterLocal(e);
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
              if (e.key === "Enter") {
                handleRegisterLocal(e);
              }
            }}
            required
            disabled={loading}
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>Already have an account? <Link to={ROUTES.LOGIN}>Login here</Link></p>
    </div>
  );
};

export default Register;