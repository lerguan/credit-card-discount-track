import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";

const Login = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      {showLogin ? (
        <>
          <LoginForm onLogin={onLogin} />
          <p>
            Don't have an account?
            <button onClick={() => setShowLogin(false)}>Sign Up</button>
          </p>
        </>
      ) : (
        <>
          <SignUpForm onLogin={onLogin} />
          <p>
            Already have an account?
            <button onClick={() => setShowLogin(true)}>Login</button>
          </p>
        </>
      )}
    </>
  );
};

export default Login;
