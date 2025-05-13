import { useState } from "react";
import EstudianteHome from "./pages/EstudianteHome";
import DocenteHome from "./pages/DocenteHome";
import LoginForm from "./components/auth/LoginForm.jsx";

export default function App() {
  const [role, setRole] = useState(null);

  const handleLogin = async (email) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/api/login", {

        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setRole(data.role);
      } else {
        alert(data.error);
      }
    } catch (err) {
      alert("Error de conexión con el backend.");
    }
  };

  if (role === "estudiante") return <EstudianteHome />;
  if (role === "docente") return <DocenteHome />;

  return <LoginForm onLogin={handleLogin} />;
}

