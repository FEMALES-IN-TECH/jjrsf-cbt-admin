import React, { useState } from "react";
import { useNavigate} from "react-router-dom";
import Navbar from "../../Components/Navbar/Navbar";
import Logo from "../../assests/LoginLogo.png";
import Footer from "../../Components/Footer/Footer";
import "../Login/login.css";
import { useLogin } from "../../Hooks/hooks";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // useNavigate for redirecting after login
  const {mutate, isPending} = useLogin()
  console.log("loadind", isPending)
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    mutate({ email, password },
      {
        onSuccess: () => {
          navigate("/Home")

        }
      }
    );
  };

  return (
    <>
      <Navbar />
      <div className="container">
        {/* Left Section */}
        <div className="left-section">
          <div className="LoginLogo">
            <img src={Logo} alt="Login Logo" />
          </div>
          <h1>Welcome Back!</h1>
          <p>Sign in to create and manage exams.</p>
        </div>

        {/* Right Section (Login Form) */}
        <div className="right-section">
          <h2>Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="login-btns" type="submit" disabled={isPending}>
            {isPending ? (
              <div className="spinner"></div> // ✅ Spinner instead of text
            ) : (
              "Login"
            )}
          </button>


          
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Login;
