import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import{Button}from 'react-bootstrap'

function Login({ setISAuthenticated }) {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.prvent.Default();
    try {
      const response = await axios.post(
        "http://localhost:3400/api/auth/login",
        { username, password },
        { withCredentials: true }
      );
      if (response.data.message === "Logged in successfully") {
        setISAuthenticated(true);
        navigate("/profile");
      }
    } catch (error) {
      setError("invalid credentials");
    }
  };
 
  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          onChange={(e) => setUserName(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Button type="submit">Login</Button>
      </form>
    </div>
  );
};
export default Login;
