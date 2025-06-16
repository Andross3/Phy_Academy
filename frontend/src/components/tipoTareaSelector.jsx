import React from "react";

export default function TipoTareaSelector({ seleccionada, onSeleccionar }) {
  const opciones = [
    {
      nombre: "Tarea Regular",
      descripcion: "Permite desarrollar soluciones de programación sin restricciones",
    },
    {
      nombre: "Tarea con Restricciones",
      descripcion: "Define palabras clave no pueden utilizar en su solución",
    },
    {
      nombre: "Tarea con Plantilla de Código",
      descripcion: "Proporciona una estructura de código predefinida",
    },
  ];

  const descripcionSeleccionada = opciones.find(
    (op) => op.nombre === seleccionada
  )?.descripcion;

  return (
    <div>
      <select
        value={seleccionada}
        onChange={(e) => onSeleccionar(e.target.value)}
        className="border bg-black text-white py-1 px-3 rounded-md"
        style={{ width: "35%" }}
      >
        <option value="">--Seleccionar--</option>
        {opciones.map((op, index) => (
          <option key={index} value={op.nombre}>
            {op.nombre}
          </option>
        ))}
      </select>

      {descripcionSeleccionada && (
        <p className="mt-2 text-sm text-gray-600">{descripcionSeleccionada}</p>
      )}
    </div>
  );
}
