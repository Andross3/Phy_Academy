import { useState } from "react";
import EstudianteHome from "./pages/EstudianteHome";
import DocenteHome from "./pages/DocenteHome";
import LoginForm from "./components/auth/LoginForm.jsx";
import Home from "./pages/Home.jsx"; // ✅ Importamos el nuevo componente

export default function App() {
  const [role, setRole] = useState(null);
  const [currentPage, setCurrentPage] = useState("home"); // 👈 Estado para manejar navegación

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

  // 👇 Lógica de redirección por rol
  if (role === "estudiante") return <EstudianteHome />;
  if (role === "docente") return <DocenteHome />;

  // 👇 Lógica para mostrar la página actual
  if (currentPage === "home") {
    return <Home onNavigateToLogin={() => setCurrentPage("login")} />;
  }

  return <LoginForm onLogin={handleLogin} />;
}
