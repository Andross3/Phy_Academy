import { useNavigate } from "react-router-dom";

export default function SeleccionRolModal({ onSeleccion }) {
  const navigate = useNavigate();

  const seleccionarRol = (rol) => {
    onSeleccion(); // Oculta el modal
    if (rol === "docente") {
      navigate("/registroProfesor");
    } else if (rol === "estudiante") {
      navigate("/registroEstudiante");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
        <h2 className="text-xl font-semibold">¿Cómo deseas registrarte?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => seleccionarRol("estudiante")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Estudiante
          </button>
          <button
            onClick={() => seleccionarRol("docente")}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Docente
          </button>
        </div>
      </div>
    </div>
  );
}


