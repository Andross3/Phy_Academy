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
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="max-w-2xl w-full p-8 bg-white rounded-xl shadow-lg border border-gray-100">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-gray-100 rounded-lg">
          <svg className="w-6 h-6 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 tracking-tight">Añadir tarea</h2>
      </div>
      
      <div className="mb-6">
        <label className="flex items-center space-x-2 text-gray-700 mb-3 font-semibold text-sm tracking-wide">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          <span>Descripción:</span>
        </label>
        <div className="relative">
          <textarea
            className="w-full h-28 p-4 border-2 border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-4 focus:ring-blue-500/20 focus:border-blue-500 resize-none transition-all duration-300 text-gray-700 placeholder-gray-400"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
            placeholder="Describe detalladamente la tarea..."
          />
          <div className="absolute bottom-2 right-3 text-xs text-gray-400 bg-white px-2 py-1 rounded-full shadow-sm">
            {descripcion.length} caracteres
          </div>
        </div>
      </div>
      
      <div className="mb-6" ref={selectRef}>
        <label className="flex items-center space-x-2 text-gray-700 mb-3 font-semibold text-sm tracking-wide">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <span>Tipo de tarea:</span>
        </label>
        <div className="relative w-full">
          <button
            type="button"
            className={`w-full p-4 border-2 rounded-lg bg-gray-800 text-white flex justify-between items-center transition-all duration-300 hover:bg-gray-700 shadow-md ${
              open ? 'ring-4 ring-gray-500/20' : ''
            }`}
            onClick={() => setOpen(!open)}
          >
            <div className="flex items-center space-x-3">
              {selectedOption ? (
                <>
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <div className="text-left">
                    <div className="font-semibold">{selectedOption.label}</div>
                    <div className="text-gray-300 text-sm opacity-90">{selectedOption.descripcion}</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span className="font-medium">--Seleccionar--</span>
                </>
              )}
            </div>
            <svg 
              className={`w-5 h-5 ml-2 transition-transform duration-300 ${open ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {open && (
            <div className="absolute z-20 mt-2 w-full bg-white border-2 border-gray-100 rounded-lg shadow-xl overflow-hidden animate-in slide-in-from-top-2 duration-200">
              {opciones.map(opt => (
                <div
                  key={opt.value}
                  className={`p-4 cursor-pointer transition-all duration-200 border-b border-gray-100 last:border-b-0 ${
                    tipoTarea === opt.value 
                      ? 'bg-gray-100 border-l-4 border-l-gray-600' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => { setTipoTarea(opt.value); setOpen(false); }}
                >
                  <div className="flex items-start space-x-3">
                    <div className={`w-2 h-2 rounded-full mt-2 ${
                      tipoTarea === opt.value ? 'bg-gray-600' : 'bg-gray-300'
                    }`}></div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-gray-900 mb-1">{opt.label}</div>
                      <div className="text-sm text-gray-600 leading-relaxed">{opt.descripcion}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8 transition-all duration-500 ease-in-out">
        {tipoTarea === 'restricciones' && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <TareaRestricciones />
          </div>
        )}
        {tipoTarea === 'plantilla' && (
          <div className="animate-in slide-in-from-bottom-4 duration-300">
            <TareaPlantilla />
          </div>
        )}
      </div>
      
      <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mt-8 sm:justify-end pt-6 border-t border-gray-100">
        <button className="flex items-center justify-center space-x-2 px-6 py-3 bg-white border-2 border-red-200 text-red-600 font-semibold rounded-lg hover:bg-red-50 hover:border-red-300 transition-all duration-300 shadow-sm hover:shadow-md">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
          <span>Cancelar</span>
        </button>
        <button
          className={`px-6 py-3 font-semibold rounded-lg transition-all duration-300 shadow-md hover:shadow-lg ${
            !tipoTarea || !descripcion.trim()
              ? 'bg-gray-400 text-gray-300 cursor-not-allowed'
              : 'bg-gray-800 text-white hover:bg-gray-900 transform hover:-translate-y-0.5'
          }`}
          disabled={!tipoTarea || !descripcion.trim()}
        >
          <span className="flex items-center justify-center space-x-2">
            <span>Publicar</span>
            {(!tipoTarea || !descripcion.trim()) ? null : (
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            )}
          </span>
        </button>
      </div>
    </div>
    </div>
  );
}