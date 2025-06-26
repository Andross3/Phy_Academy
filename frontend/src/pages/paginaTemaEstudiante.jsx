import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Puedes copiar el StarryBackground de EstudianteHome si quieres el fondo de estrellas
const StarryBackground = () => {
  const canvasRef = React.useRef(null);
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

export default function PaginaTemaEstudiante() {
  const { id } = useParams(); // id del curso
  const [curso, setCurso] = useState(null);
  const [temas, setTemas] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Opcional: obtener datos del curso (nombre, descripción)
    fetch(`http://localhost:5000/api/cursos`)
      .then(res => res.json())
      .then(data => {
        const cursoData = (Array.isArray(data) ? data : data.cursos).find(c => c.id === parseInt(id));
        setCurso(cursoData);
      });
    // Obtener temas y tareas
    fetch(`http://localhost:5000/api/curso/${id}/temas`)
      .then(res => res.json())
      .then(data => setTemas(data.temas || []));
  }, [id]);

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center relative">
      <StarryBackground />
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6 mb-8 relative z-10">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">{curso?.nombre || 'Curso'}</h1>
        <p className="text-gray-600 mb-4">{curso?.descripcion}</p>
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Temas</h2>
        {temas.length === 0 ? (
          <div className="text-gray-500">No hay temas creados.</div>
        ) : (
          temas.map(tema => (
            <div key={tema.id} className="mb-6 border rounded-lg p-4 bg-gray-50">
              <h3 className="font-bold text-lg text-gray-800 mb-2">{tema.nombre}</h3>
              {tema.tareas.length === 0 ? (
                <div className="text-gray-400 ml-2">No hay tareas en este tema.</div>
              ) : (
                <div className="grid gap-4 ml-2">
                  {tema.tareas.map(tarea => (
                    <div
                      key={tarea.id}
                      className="bg-white rounded-lg shadow p-4 flex flex-col gap-2 transition-transform duration-200 hover:scale-105 hover:bg-blue-50 cursor-pointer"
                      onClick={() => navigate(`/paginaCodigo?tareaId=${tarea.id}`)}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-semibold text-gray-800 text-base">{tarea.titulo}</span>
                        <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">{tarea.tipo_tarea}</span>
                      </div>
                      <div className="text-gray-600 text-sm mb-1">{tarea.descripcion}</div>
                      <div className="text-xs text-gray-500">Entrega: {tarea.fecha_entrega} {tarea.hora_entrega}</div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
