import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>Benvenuto 👋</h1>
      <p>Accedi per vedere i dati</p>
      <Link to="/login"><button>Login</button></Link>
      <Link to="/register"><button>Register</button></Link>
    </div>
  );
}
