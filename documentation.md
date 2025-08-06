# Overview: Comunicazione Frontend (React) e Backend (Spring Boot) con JWT e CORS

---

## 1. Processo di Login lato Frontend

- L’utente inserisce email e password nel form di login.
- Alla pressione del bottone “Login”, si attiva la funzione `handleSubmit`.
- `handleSubmit` invia una richiesta HTTP POST al backend all’endpoint `/api/auth/login`.
- I dati email e password sono inviati nel corpo della richiesta in formato JSON.
- La richiesta è fatta con la funzione `fetch()` di JavaScript.

---

## 2. Problema CORS (Cross-Origin Resource Sharing)

- Frontend e backend sono su domini (o porte) differenti:
  - Frontend su `http://localhost:5173`
  - Backend su `http://localhost:8080`
- Il browser, per motivi di sicurezza, blocca richieste cross-origin se il backend non autorizza esplicitamente il frontend.
- Il blocco è manifestato come errore CORS nella console del browser.

---

## 3. Soluzione CORS nel Backend Spring Boot

- Nel backend si aggiunge una configurazione che consente richieste dal frontend.
- Questa configurazione:
  - Permette a tutte le API (`/**`) di ricevere richieste da `http://localhost:5173`.
  - Permette i metodi HTTP necessari (GET, POST, PUT, DELETE, OPTIONS).
- Se si usa Spring Security, è necessario abilitare CORS anche nella configurazione di sicurezza.

---

## 4. Processo di Autenticazione e Token JWT

- Il backend verifica email e password ricevute.
- Se corrette, genera un token JWT e lo invia al frontend.
- Il frontend salva il token JWT, solitamente in `localStorage`.
- Per ogni chiamata successiva a API protette, il frontend invia il token JWT nell’header `Authorization`.

---

## 5. Accesso a risorse protette

- Il backend verifica il token JWT ricevuto nelle richieste protette.
- Se il token è valido, autorizza l’accesso.
- Altrimenti, blocca la richiesta con un errore di autorizzazione.

---

## 6. Spiegazione del codice React (frontend)

Ecco un esempio semplificato della pagina di login React (Login.jsx):

```jsx
import { useState } from 'react';

function Login() {
  // Stato per email e password
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Funzione chiamata al submit del form
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene refresh pagina

    // Chiamata POST all’API di login
    const response = await fetch('http://localhost:8080/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (response.ok) {
      const data = await response.json();
      // Salva token JWT ricevuto
      localStorage.setItem('token', data.token);
      alert('Login effettuato!');
    } else {
      alert('Errore login');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="email" 
        placeholder="Email" 
        value={email} 
        onChange={e => setEmail(e.target.value)} 
        required 
      />
      <input 
        type="password" 
        placeholder="Password" 
        value={password} 
        onChange={e => setPassword(e.target.value)} 
        required 
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
