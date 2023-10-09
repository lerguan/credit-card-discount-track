import { useState } from "react";
import LoginForm from "../components/LoginForm";
import SignUpForm from "../components/SignUpForm";
import wordart from "../images/wordart.png";

const Login = ({ onLogin }) => {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <>
      <header>
        <img src={wordart} />
      </header>
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
