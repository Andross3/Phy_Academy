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
  const selectRef = useRef(null);

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

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Añadir tarea</h2>
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripcion:</label>
        <textarea
          className="w-full h-24 p-2 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
        />
      </div>
      <div className="mb-4" ref={selectRef}>
        <label className="block text-gray-700 mb-2">Tipo de tarea:</label>
        <div className="relative w-80">
          <button
            type="button"
            className="w-full p-2 border rounded bg-gray-800 text-white flex justify-between items-center"
            onClick={() => setOpen(!open)}
          >
            <span>{selectedOption ? selectedOption.label : '--Seleccionar--'}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
          </button>
          {open && (
            <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg">
              {opciones.map(opt => (
                <div
                  key={opt.value}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${tipoTarea === opt.value ? 'bg-gray-200' : ''}`}
                  onClick={() => { setTipoTarea(opt.value); setOpen(false); }}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-gray-500 text-sm">{opt.descripcion}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <div className="mt-8">
        {tipoTarea === 'restricciones' && <TareaRestricciones />}
        {tipoTarea === 'plantilla' && <TareaPlantilla />}
      </div>
      <div className="flex space-x-4 mt-8 justify-end">
        <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Cancelar</button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          disabled={!tipoTarea}
        >
          Publicar
        </button>
      </div>
    </div>
  );
} 