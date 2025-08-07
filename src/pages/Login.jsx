import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
  const res = await fetch("https://user-auth-api-production-5340.up.railway.app/api/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // <-- AGGIUNGI QUESTO
    body: JSON.stringify({ email, password })
  });


      if (!res.ok) throw new Error("Login fallito");

      const data = await res.json();
      localStorage.setItem("token", data.token); // salva il token
      navigate("/dashboard"); // vai alla dashboard
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Login</button>
      <p>
        Hai dimenticato la password?{' '}
        <Link to="/forgot-password">Reimposta</Link>
      </p>
      <p>
        Non hai un account?{' '}
        <Link to="/register">Registrati</Link>
      </p>
    </form>
    
  );
}
