import React, { useState, useRef, useEffect } from 'react';
import TareaRestricciones from '../components/tareaRestricciones';
import TareaPlantilla from '../components/tareaPlantilla';

const opciones = [
  {
    value: 'regular',
    label: 'Tarea Regular',
    descripcion: 'Permite desarrollar soluciones de programación sin restricciones',
  },
  {
    value: 'restricciones',
    label: 'Tarea con Restricciones',
    descripcion: 'Define palabras clave para que utilicen en su solución',
  },
  {
    value: 'plantilla',
    label: 'Tarea con Plantilla de Código',
    descripcion: 'Proporciona una estructura de código predefinida',
  },
];

export default function PaginaTareaDocente() {
  const [descripcion, setDescripcion] = useState('');
  const [tipoTarea, setTipoTarea] = useState('');
  const [open, setOpen] = useState(false);
  const [restricciones, setRestricciones] = useState([]);
  const [codigo, setCodigo] = useState('');
  const selectRef = useRef(null);

  const [errores, setErrores] = useState({});

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = opciones.find(opt => opt.value === tipoTarea);

  const validarFormulario = () => {
    const nuevosErrores = {};

    if (descripcion.trim().length < 10) {
      nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres.';
    }

    if (!tipoTarea) {
      nuevosErrores.tipoTarea = 'Debe seleccionar un tipo de tarea.';
    }

    if (tipoTarea === 'restricciones' && restricciones.length === 0) {
      nuevosErrores.restricciones = 'Debe seleccionar al menos una restricción.';
    }

    setErrores(nuevosErrores);

    return Object.keys(nuevosErrores).length === 0;
  };

  const enviarDatos = async () => {
    if (!validarFormulario()) return;

    const datos = {
      descripcion,
      tipoTarea,
      restricciones,
    };

    try {
      const response = await fetch('http://localhost:5000/api/tareas', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(datos),
      });

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Datos enviados correctamente:', jsonResponse);
        alert('Tarea publicada exitosamente');
      } else {
        console.error('Error al enviar los datos:', response.status);
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Añadir tarea</h2>

      {/* Descripción */}
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción:</label>
        <textarea
          className="w-full h-24 p-2 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
        {errores.descripcion && (
          <p className="text-red-600 text-sm mt-1">{errores.descripcion}</p>
        )}
      </div>

      {/* Selector tipo de tarea */}
      <div className="mb-4" ref={selectRef}>
        <label className="block text-gray-700 mb-2">Tipo de tarea:</label>
        <div className="relative w-80">
          <button
            type="button"
            className="w-full p-2 border rounded bg-gray-800 text-white flex justify-between items-center"
            onClick={() => setOpen(!open)}
          >
            <span>{selectedOption ? selectedOption.label : '--Seleccionar--'}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {open && (
            <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg">
              {opciones.map(opt => (
                <div
                  key={opt.value}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${tipoTarea === opt.value ? 'bg-gray-200' : ''}`}
                  onClick={() => {
                    setTipoTarea(opt.value);
                    setOpen(false);
                    setErrores({ ...errores, tipoTarea: undefined }); // limpiar error al seleccionar
                  }}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-gray-500 text-sm">{opt.descripcion}</div>
                </div>
              ))}
            </div>
          )}
        </div>
        {errores.tipoTarea && (
          <p className="text-red-600 text-sm mt-1">{errores.tipoTarea}</p>
        )}
      </div>

      {/* Componentes según tipo de tarea */}
      <div className="mt-8">
        {tipoTarea === 'restricciones' && (
          <>
            <TareaRestricciones setRestricciones={setRestricciones} />
            {errores.restricciones && (
              <p className="text-red-600 text-sm mt-2">{errores.restricciones}</p>
            )}
          </>
        )}
        {tipoTarea === 'plantilla' && <TareaPlantilla />}
      </div>

      {/* Botones */}
      <div className="flex space-x-4 mt-8 justify-end">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
          Cancelar
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          disabled={false}
          onClick={enviarDatos}
        >
          Publicar
        </button>
      </div>
    </div>
  );
}
