// src/pages/Login.jsx
import { useState } from "react";

function Login() {
  const [email, setEmail] = useState("emelin@gmail.com");
  const [password, setPassword] = useState("password");
  const [message, setMessage] = useState("...");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("https://user-auth-api-production-5340.up.railway.app/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // salva token
      setMessage("Login effettuato!");
    } else {
      setMessage("Errore login");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <br />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}

export default Login;
