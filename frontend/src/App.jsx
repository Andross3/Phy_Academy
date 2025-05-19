import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import EstudianteHome from "./pages/EstudianteHome";
import DocenteHome from "./pages/DocenteHome";
import LoginForm from "./components/auth/LoginForm.jsx";
import Home from "./pages/Home.jsx";
import PaginaCodigo from "./pages/paginaCodigo.jsx";
import Layout from "./routes/Layout.jsx";

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

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<LoginForm onLogin={handleLogin} />} />

          {role === "estudiante" && (
            <Route path="/estudiante" element={<EstudianteHome />} />
          )}
          {role === "docente" && (
            <Route path="/docente" element={<DocenteHome />} />
          )}

          {role === "estudiante" && <Route path="*" element={<Navigate to="/estudiante" />} />}
          {role === "docente" && <Route path="*" element={<Navigate to="/docente" />} />}

          <Route path="paginaCodigo" element={<PaginaCodigo />}></Route>
        </Route>
      </Routes>
    </Router>
  );
}
