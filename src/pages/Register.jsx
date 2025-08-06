import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("https://user-auth-api-production-5340.up.railway.app/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          fullName,
          password
        })
      });

      if (!res.ok) throw new Error("Registrazione fallita");

      alert("Registrazione completata, ora puoi fare login");
      navigate("/login");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
      <input type="text" placeholder="Full Name" value={fullName} onChange={e => setFullName(e.target.value)} required />
      <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
      <button type="submit">Register</button>
    </form>
  );
}
