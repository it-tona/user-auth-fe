// src/pages/Login.jsx
import { useState } from "react";

function Register() {
  const [email, setEmail] = useState("emelin@gmail.com");
  const [password, setPassword] = useState("password");
  const [fullName, setFullName] = useState("Emelin");
  const [message, setMessage] = useState("...");

  async function handleSubmit(e) {
    e.preventDefault();
    setMessage("");

    const res = await fetch("http://localhost:8080/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, fullName }),
    });

    if (res.ok) {
      const data = await res.json();
      localStorage.setItem("token", data.token); // salva token
      setMessage("Registration effettuato!");
    } else {
      setMessage("Errore Registration");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Ragistration</h2>
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
        <input
            type="text"
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
        />  
    <br />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}

export default Register;
