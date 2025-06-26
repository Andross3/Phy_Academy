import React, { useEffect, useState } from 'react';

export default function CatalogoCursos() {
  const [cursosTotales, setCursosTotales] = useState([]);

  useEffect(() => {
    fetch(`/api/cursos`) // Ajusta la ruta si tu endpoint cambia
      .then(res => res.json())
      .then(data => {
        setCursosTotales(data.cursos || data);
      });
  }, []);

  const inscribirse = async (idCurso) => {
    const idEstudiante = localStorage.getItem("userId");
    const res = await fetch(`/inscripciones/inscribir`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id_estudiante: idEstudiante, id_curso: idCurso })
    });
    const data = await res.json();
    if (res.ok) {
      alert("¡Inscripción exitosa!");
    } else {
      alert(data.error || "Error al inscribirse");
    }
  };

  return (
    <div className="mb-10">
      <h2 className="text-white text-3xl font-mono mb-8">Catálogo de cursos</h2>
      <div className="flex flex-wrap gap-6 justify-center">
        {cursosTotales.map((curso, index) => (
          <div
            key={curso.id}
            className="bg-gray-900 rounded-lg p-5 w-full max-w-xs shadow-lg border border-gray-800 flex flex-col"
          >
            <div className="mb-3">
              <span className={[
                "bg-green-500",
                "bg-blue-400",
                "bg-pink-500"
              ][index % 3] + " text-black px-3 py-1 rounded-full text-sm font-medium"}>
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
            <button
              onClick={() => inscribirse(curso.id)}
              className="w-full bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 text-white font-bold py-2 px-4 rounded-md transition-colors shadow-lg"
            >
              Inscribirse
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 