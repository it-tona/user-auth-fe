import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function ResetPasswordPage() {
  const query = useQuery();
  const token = query.get('token');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('https://user-auth-api-production-5340.up.railway.app/api/auth/reset-password?token=${token}', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      credentials: "include", 
      body: JSON.stringify({
        password,
        confirmPassword
      }),
    });

    if (res.ok) {
      setMessage('Password aggiornata con successo!');
    } else {
      setMessage('Errore nel reset della password.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Reset Password</h2>
      <input
        type="password"
        placeholder="Nuova password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Conferma password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        required
      />
      <button type="submit">Resetta</button>
      <p>{message}</p>
    </form>
  );
}
