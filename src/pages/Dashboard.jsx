import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  // Carica dati utente all’avvio
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login"); // se non c’è token vai a login
        return;
      }

      try {
        const res = await fetch("https://user-auth-api-production-5340.up.railway.app/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (res.status === 401) {
          // token non valido o scaduto
          localStorage.removeItem("token");
          navigate("/login");
          return;
        }

        if (!res.ok) throw new Error("Errore nel recupero dati");

        const data = await res.json();
        setUserData(data);
      } catch (error) {
        alert(error.message);
      }
    };

    fetchUserData();
  }, [navigate]);

  // Funzione logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  if (!userData) {
    return <p>Caricamento dati...</p>;
  }

  return (
    <div>
      <h2>Dashboard</h2>
      <p><strong>ID:</strong> {userData.id || "N/A"}</p>
      <p><strong>Email:</strong> {userData.email}</p>
      <p><strong>Nome Completo:</strong> {userData.fullName}</p>
      <p><strong>Ruolo:</strong> {userData.role}</p>

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;
