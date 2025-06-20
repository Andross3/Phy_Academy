import React, { useEffect, useState } from 'react';

const ArchivoCompilador = ({ onSeleccionarTarea }) => {
  const [archivoActivo, setArchivoActivo] = useState(null);
  const [tareas, setTareas] = useState([]);

  useEffect(() => {
    // Cargar tareas desde el backend
    fetch("http://localhost:5000/api/tareas")
      .then(res => {
        if (!res.ok) throw new Error("Error al obtener tareas");
        return res.json();
      })
      .then(data => {
        setTareas(data.tareas || []);
      })
      .catch(err => {
        console.error("Error cargando tareas:", err);
      });
  }, []);

  const toggleArchivo = (index, tareaId) => {
    const nuevoActivo = archivoActivo === index ? null : index;
    setArchivoActivo(nuevoActivo);

    if (nuevoActivo !== null && onSeleccionarTarea) {
      onSeleccionarTarea(tareaId); // Pasamos el ID al componente padre
    }
  };

  return (
    <div className='ml-1 flex flex-col p-4 rounded shadow-md h-[550px] w-50px border border-white overflow-auto'>
      <div className="flex items-center bg-black p-2 border-b border-gray-100 w-fit -mt-2 ml-12 text-white font-semibold space-x-2">
        <i className="bi bi-person-workspace"></i>
        <h2 className='text-xl font-bold text-gray-50'>Archivos en los que trabajo</h2>
      </div>

      <div className="mt-4">
        {tareas.length === 0 ? (
          <p className="text-white">No hay tareas para mostrar.</p>
        ) : (
          tareas.map((tarea, index) => (
            <div key={tarea.id} className="border border-gray-600 p-3 rounded-md mb-2">
              <button
                className="w-full flex justify-between items-center text-white font-medium hover:bg-gray-700 p-2 rounded-md transition"
                onClick={() => toggleArchivo(index, tarea.id)}
              >
                <div className="flex items-center space-x-2">
                  <i className="bi bi-file-earmark-code"></i>
                  <span>{tarea.titulo}</span>
                </div>
                <span>{archivoActivo === index ? "▲" : "▼"}</span>
              </button>

              {archivoActivo === index && (
                <div className="mt-2 bg-gray-800 p-3 rounded-md text-gray-300">
                  <pre className="whitespace-pre-wrap">
                    {tarea.codigo_plantilla || "No hay código disponible"}
                  </pre>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ArchivoCompilador;
