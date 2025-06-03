import React from 'react';
import { FaFilter } from 'react-icons/fa';

const EstudianteTrabajo = ({ tareas =[]}) => {
  return (
    <>
    <div className="bg-gray-900 text-white p-6 rounded-lg shadow-lg w-full">
            <p className="text-xl font-bold mb-4">Trabajos del Estudiante</p>

            <div className="flex flex-col">
                <div className='flex flex-col'>
                    <p className="text-lg font-semibold m-4"></p>
                    {tareas.filter(t => t.calificado).map((tarea, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-lg flex justify-between">
                            <span>{tarea.titulo}</span>
                            <span className="text-blue-700 font-bold">{tarea.puntaje}/10</span>
                        </div>
                    ))}
                </div>
                <div>
                    <p className="text-lg font-semibold mb-2"></p>
                    {tareas.filter(t => !t.calificado).map((tarea, index) => (
                        <div key={index} className="bg-gray-800 p-3 rounded-lg flex justify-between">
                            <span>{tarea.titulo}</span>
                            <button 
                                className="border border-white text-white bg-transparent px-4 py-2 rounded-md transition duration-300 hover:bg-white hover:text-black"
                                onClick={() => window.location.href = "/codigo"}>
                                Ir a página
                            </button>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    </>

  );
};

export default EstudianteTrabajo;
