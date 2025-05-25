import React from 'react';
import { useState } from 'react';

const ArchivoCompilador = () => {
    const [archivoActivo, setArchivoActivo] = useState(null);

    const toggleArchivo = (index) => {
        setArchivoActivo(archivoActivo === index ? null : index);
    };

    //archivos de ejemplo, como se veria mas omenos
    const archivosEjemplo = [
        { nombre: "Tarea_1.py", contenido: "print('¡Hola mundo!')" },
        { nombre: "Calculadora.py", contenido: "def sumar(a, b): return a + b" },
        { nombre: "Funciones.py", contenido: "def saludar(): print('Hola')" }
    ];

    return (
        <div className='ml-1 flex flex-col  p-4 rounded shadow-md w-full h-[650px] border border-white overflow-auto'>
            <div className="flex items-center  bg-black p-2 border-b boder-grey-100 w-fit -mt-2 ml-12 text-white font-semibold space-x-2">
                <i class="bi bi-person-workspace"></i>
            <h2 className='text-xl font-bold text-gray-50'>Archivos en los que trabajo</h2>
            </div>
           <div className="mt-4">
                {archivosEjemplo.map((archivo, index) => (
                    <div key={index} className="border border-gray-600 p-3 rounded-md mb-2">
                        <button
                            className="w-full flex justify-between items-center text-white font-medium hover:bg-gray-700 p-2 rounded-md transition"
                            onClick={() => toggleArchivo(index)}
                        >
                            <div className="flex items-center space-x-2">
                                <i className="bi bi-file-earmark-code"></i>
                                <span>{archivo.nombre}</span>
                            </div>
                            <span>{archivoActivo === index ? "▲" : "▼"}</span>
                        </button>

                        {archivoActivo === index && (
                            <div className="mt-2 bg-gray-800 p-3 rounded-md text-gray-300">
                                <pre className="whitespace-pre-wrap">{archivo.contenido}</pre>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ArchivoCompilador;