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
    fetch(`http://localhost:5000/api/docente/${idDocente}/cursos`)
      .then(res => res.json())
      .then(data => {
        setCursos(Array.isArray(data) ? data : data.cursos);
      })
      .catch(error => {
        console.error("Error al cargar cursos:", error);
        setMensaje("Error al cargar los cursos");
      });
  }, [idDocente, navigate]);

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
          cursos.map((curso, idx) => (
            <div
              key={curso.id}
              className="bg-[#181F2A] rounded-xl shadow-lg p-6 flex flex-col justify-between hover:scale-105 transition-transform duration-200 cursor-pointer"
              onClick={() => navigate(`/docente/curso/${curso.id}`)}
            >
              {/* Dificultad estática */}
              <span className={`inline-block px-3 py-1 text-xs font-semibold rounded-full mb-2
                ${idx % 2 === 0 ? "bg-green-200 text-green-800" : "bg-blue-200 text-blue-800"}`}>
                {idx % 2 === 0 ? "Principiante" : "Intermedio"}
              </span>
              <h3 className="text-lg font-bold text-white mb-1">{curso.nombre}</h3>
              <p className="text-gray-300 text-sm mb-4">{curso.descripcion}</p>
              {/* Info estática */}
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center">
                  <span className="text-yellow-400 text-lg mr-1">★</span>
                  <span className="text-yellow-400 text-lg mr-1">★</span>
                  <span className="text-yellow-400 text-lg mr-1">★</span>
                  <span className="text-yellow-400 text-lg mr-1">★</span>
                  <span className="text-gray-400 text-lg">★</span>
                </div>
                <div className="flex items-center text-gray-300 text-xs">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-3-3.87M9 20H4v-2a4 4 0 013-3.87m6 5.87v-2a4 4 0 00-3-3.87M12 4a4 4 0 110 8 4 4 0 010-8z" />
                  </svg>
                  {idx % 2 === 0 ? "3,400+" : "1,800+"}
                </div>
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
            fetch(`http://localhost:5000/api/docente/${idDocente}/cursos`)
              .then(res => res.json())
              .then(data => setCursos(Array.isArray(data) ? data : data.cursos));
          }}
          idDocente={idDocente}
        />
      )}
    </div>
  );
}
