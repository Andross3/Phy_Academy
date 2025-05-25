// App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import SeleccionRolModal from "./components/SeleccionRolModal";
import RegistroEstudiante from "./pages/registro/RegistroEstudiante";
import RegistroProfesor from "./pages/registro/RegistroProfesor";
import EstudianteHome from "./pages/EstudianteHome";
import DocenteHome from "./pages/DocenteHome";
import LoginForm from "./components/auth/LoginForm";
import Home from "./pages/Home";
import PaginaCodigo from "./pages/paginaCodigo";
import EstudiantePage from "./pages/EstudiantePage";
import Layout from "./routes/Layout";

export default function App() {
  const [mostrarModalRol, setMostrarModalRol] = useState(false);

  return (
    <Router>
      {mostrarModalRol && (
        <SeleccionRolModal onSeleccion={() => setMostrarModalRol(false)} />
      )}

      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home onRegisterClick={() => setMostrarModalRol(true)} />} />
          <Route path="login" element={<LoginForm />} />
          <Route path="docente" element={<DocenteHome />} />
          <Route path="estudiante" element={<EstudianteHome />} />
          <Route path="paginaCodigo" element={<PaginaCodigo />} />
          <Route path="page/estudiante" element={<EstudiantePage />} />
          <Route
            path="registroProfesor"
            element={<RegistroProfesor onBackToHome={() => window.location.href = "/"} />}
          />
          <Route
            path="registroEstudiante"
            element={<RegistroEstudiante onBackToHome={() => window.location.href = "/"} />}
          />
        </Route>
      </Routes>
    </Router>
  );
}

