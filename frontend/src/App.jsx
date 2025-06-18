import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import EstudianteHome from "./pages/EstudianteHome";
import DocenteHome from "./pages/DocenteHome";
import LoginForm from "./components/auth/LoginForm.jsx";
import Home from "./pages/Home.jsx";
import PaginaCodigo from "./pages/paginaCodigo.jsx";
import Layout from "./routes/Layout.jsx";
import EstudiantePage from "./pages/EstudiantePage.jsx";
import PaginaTareaDocente from "./pages/paginaTareaDocente.jsx";

import SeleccionRolModal from "./components/SeleccionRolModal";
import RegistroEstudiante from "./pages/registro/RegistroEstudiante";
import RegistroProfesor from "./pages/registro/RegistroProfesor";

export default function App() {
  const [role, setRole] = useState(null);
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
          <Route path="paginaCodigo" element={<PaginaCodigo />}></Route>
          <Route path="page/estudiante" element={<EstudiantePage />}></Route>
          <Route path="paginaTareaDocente" element={<PaginaTareaDocente />} />
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
