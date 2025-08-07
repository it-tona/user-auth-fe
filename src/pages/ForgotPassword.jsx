import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('https://user-auth-api-production-5340.up.railway.app/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    if (res.ok) {
      setMessage('Controlla la tua email per il link di reset.');
    } else {
      setMessage('Errore durante l’invio della mail.');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Hai dimenticato la password?</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <button type="submit">Invia link di reset</button>
      <p>{message}</p>
    </form>
  );
}
