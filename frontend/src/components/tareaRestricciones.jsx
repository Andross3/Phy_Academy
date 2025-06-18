import React, { useState, useRef, useEffect } from 'react';

const RESTRICCIONES = [
  'if', 'else', 'elif', 'x if condition else y', 'if condition1 and condition2', 'if condition1 or condition2',
  'if not condition', 'if condition: if other_condition:', 'if a == b', 'if a != b', 'if a > b', 'if a < b',
  'if a >= b', 'if a <= b', 'if item in collection', 'if item not in collection', 'if a is b', 'if a is not b',
  'if variable', 'if not lista', 'if all([cond1, cond2])', 'if any([cond1, cond2])', '(lambda x: x > 10)(valor)',
  '[x for x in lista if x > 0]', 'while', 'for', 'break', 'continue', 'try/except', 'assert',
];

export default function TareaRestricciones({ setRestricciones }) {
  const [restricciones, setLocalRestricciones] = useState([]);
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

  const handleAdd = (restric) => {
    if (!restricciones.includes(restric)) {
      const newRestricciones = [...restricciones, restric];
      setLocalRestricciones(newRestricciones);
      setRestricciones(newRestricciones);  // Aquí actualizas el estado en el componente principal
    }
    setOpen(false);
  };

  const handleRemove = (restric) => {
    const newRestricciones = restricciones.filter(r => r !== restric);
    setLocalRestricciones(newRestricciones);
    setRestricciones(newRestricciones);  // Aquí actualizas el estado en el componente principal
  };

  return (
    <div className="flex items-start space-x-6 mt-6">
      <div className="flex flex-col w-64" ref={selectRef}>
        <label className="block text-gray-700 mb-2">Restricciones:</label>
        <button
          type="button"
          className="w-full p-2 border rounded bg-gray-800 text-white flex justify-between items-center"
          onClick={() => setOpen(!open)}
        >
          <span>--Seleccionar--</span>
          <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
        </button>
        {open && (
          <div className="absolute z-20 mt-2 w-64 bg-white border rounded shadow-lg max-h-60 overflow-auto">
            {RESTRICCIONES.map((r, idx) => (
              <div
                key={idx}
                className={`p-2 cursor-pointer hover:bg-gray-100 ${restricciones.includes(r) ? 'bg-gray-200' : ''}`}
                onClick={() => handleAdd(r)}
              >
                {r}
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1">
        <div className="min-h-[80px] bg-gray-300 rounded-lg p-4 flex flex-wrap items-start">
          {restricciones.length === 0 && (
            <span className="text-gray-500">No hay restricciones seleccionadas.</span>
          )}
          {restricciones.map((r, idx) => (
            <span
              key={idx}
              className="bg-yellow-200 text-gray-800 rounded-full px-3 py-1 mr-2 mb-2 flex items-center text-sm font-medium"
            >
              {r}
              <button
                className="ml-2 text-gray-600 hover:text-red-600 focus:outline-none"
                onClick={() => handleRemove(r)}
                aria-label="Eliminar restricción"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
