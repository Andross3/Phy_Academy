import { useEffect, useState, useRef } from "react";
import AniadirCurso from "../components/AniadirCurso";
import { useNavigate } from "react-router-dom";

// COPIA AQUÍ EL COMPONENTE StarryBackground
const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 bg-black w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default function DocenteHome() {
  const [cursos, setCursos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [mensaje, setMensaje] = useState("");
  const [editCurso, setEditCurso] = useState(null);
  const [deleteCurso, setDeleteCurso] = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDescripcion, setEditDescripcion] = useState("");
  const navigate = useNavigate();
  const idDocente = localStorage.getItem("userId");
  const userRole = localStorage.getItem("userRole");

  useEffect(() => {
    // Verificación de seguridad
    if (!idDocente || userRole !== "docente") {
      navigate("/login");
      return;
    }

    // Cargar cursos
    fetch(`/api/docente/${idDocente}/cursos`)
      .then(res => res.json())
      .then(data => {
        setCursos(Array.isArray(data) ? data : data.cursos);
      })
      .catch(error => {
        console.error("Error al cargar cursos:", error);
        setMensaje("Error al cargar los cursos");
      });
  }, [idDocente, navigate]);

  // Editar curso
  const handleEditCurso = (curso) => {
    setEditCurso(curso);
    setEditNombre(curso.nombre);
    setEditDescripcion(curso.descripcion);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!editCurso) return;
    const res = await fetch(`http://localhost:5000/api/curso/${editCurso.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nombre: editNombre, descripcion: editDescripcion })
    });
    if (res.ok) {
      setEditCurso(null);
      setEditNombre("");
      setEditDescripcion("");
      setMensaje("Curso editado exitosamente");
      setTimeout(() => setMensaje(""), 3000);
      fetch(`http://localhost:5000/api/docente/${idDocente}/cursos`)
        .then(res => res.json())
        .then(data => setCursos(Array.isArray(data) ? data : data.cursos));
    }
  };

  // Eliminar curso
  const handleDeleteCurso = async () => {
    if (!deleteCurso) return;
    const res = await fetch(`http://localhost:5000/api/curso/${deleteCurso.id}`, {
      method: "DELETE"
    });
    if (res.ok) {
      setDeleteCurso(null);
      setMensaje("Curso eliminado exitosamente");
      setTimeout(() => setMensaje(""), 3000);
      fetch(`http://localhost:5000/api/docente/${idDocente}/cursos`)
        .then(res => res.json())
        .then(data => setCursos(Array.isArray(data) ? data : data.cursos));
    }
  };

  // Menú de 3 puntitos
  function MenuCurso({ onEdit, onDelete }) {
    const [open, setOpen] = useState(false);
    return (
      <div className="relative">
        <button
          className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
          onClick={e => { e.stopPropagation(); setOpen(o => !o); }}
          aria-label="Opciones de curso"
        >
          <svg width="20" height="20" fill="currentColor" className="text-gray-500" viewBox="0 0 20 20">
            <circle cx="4" cy="10" r="2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="16" cy="10" r="2" />
          </svg>
        </button>
        {open && (
          <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={e => { e.stopPropagation(); setOpen(false); onEdit(); }}>Editar</button>
            <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600" onClick={e => { e.stopPropagation(); setOpen(false); onDelete(); }}>Eliminar</button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center py-8 relative">
      {/* Fondo de estrellitas */}
      <StarryBackground />

      {/* Mensaje de bienvenida */}
      <div className="w-full max-w-5xl mb-6 px-4 relative z-10">
        <div className="bg-white bg-opacity-90 p-6 rounded-xl shadow text-left">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Bienvenido Docente</h1>
          {mensaje && (
            <div className="bg-green-100 text-green-800 px-4 py-2 rounded mb-2">
              {mensaje}
            </div>
          )}
          <p className="text-gray-600">Aquí puedes gestionar tus cursos y añadir nuevos.</p>
        </div>
      </div>

      {/* Encabezado y botón */}
      <div className="w-full max-w-5xl flex items-center justify-between mb-8 px-4 relative z-10">
        <div>
          <h2 className="text-2xl font-bold text-white">Cursos creados</h2>
        </div>
        <button
          className="flex items-center bg-white border border-gray-300 hover:bg-blue-600 hover:text-white text-blue-600 font-semibold px-4 py-2 rounded-lg shadow transition-colors"
          onClick={() => setShowModal(true)}
        >
          <span className="text-2xl mr-2">＋</span> Añadir curso
        </button>
      </div>

      {/* Cards de cursos */}
      <div className="w-full max-w-5xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 px-4 relative z-10">
        {cursos.length === 0 ? (
          <div className="col-span-full text-gray-500 text-center">No hay cursos creados.</div>
        ) : (
          cursos.map((curso, index) => (
            <div
              key={curso.id}
              className="bg-gray-900 rounded-lg p-5 w-full max-w-xs shadow-lg border border-gray-800 flex flex-col hover:scale-105 transition-transform duration-200 cursor-pointer relative"
              onClick={() => navigate(`/docente/curso/${curso.id}`)}
            >
              {/* Menú de 3 puntitos */}
              <div className="absolute top-2 right-2 z-20">
                <MenuCurso
                  onEdit={() => handleEditCurso(curso)}
                  onDelete={() => setDeleteCurso(curso)}
                />
              </div>
              <div className="mb-3">
                <span className={["bg-green-500", "bg-blue-400", "bg-pink-500"][index % 3] + " text-black px-3 py-1 rounded-full text-sm font-medium"}>
                  {["Principiante", "Intermedio", "Avanzado"][index % 3]}
                </span>
              </div>
              <h3 className="text-white font-bold mb-2">{curso.nombre}</h3>
              <p className="text-gray-300 text-sm mb-4">{curso.descripcion}</p>
              <div className="flex items-center text-gray-400 text-sm mb-2">
                <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                {["3,400", "1,800", "1,800"][index % 3]}+
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill={i < [5, 4, 4][index % 3] ? "currentColor" : "none"}
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className={i < [5, 4, 4][index % 3] ? 'text-yellow-400' : 'text-gray-500'}
                  >
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal para añadir curso */}
      {showModal && (
        <AniadirCurso
          onClose={() => setShowModal(false)}
          onCursoCreado={() => {
            setShowModal(false);
            setMensaje("¡Curso creado exitosamente!");
            setTimeout(() => setMensaje(""), 3000);
            // Recarga cursos
            fetch(`/api/docente/${idDocente}/cursos`)
              .then(res => res.json())
              .then(data => setCursos(Array.isArray(data) ? data : data.cursos));
          }}
          idDocente={idDocente}
        />
      )}
      {editCurso && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Editar Curso</h2>
            <form onSubmit={handleEditSubmit}>
              <input
                className="w-full mb-2 p-2 border rounded"
                placeholder="Nombre del curso"
                value={editNombre}
                onChange={e => setEditNombre(e.target.value)}
                required
              />
              <textarea
                className="w-full mb-2 p-2 border rounded"
                placeholder="Descripción"
                value={editDescripcion}
                onChange={e => setEditDescripcion(e.target.value)}
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  className="mr-2 px-4 py-2 rounded border"
                  onClick={() => setEditCurso(null)}
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Guardar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {deleteCurso && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4 text-red-600">¿Eliminar curso?</h2>
            <p className="mb-4">¿Estás seguro de que deseas eliminar el curso <b>{deleteCurso.nombre}</b>?</p>
            <div className="flex justify-end">
              <button
                className="mr-2 px-4 py-2 rounded border"
                onClick={() => setDeleteCurso(null)}
              >
                Cancelar
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded"
                onClick={handleDeleteCurso}
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
