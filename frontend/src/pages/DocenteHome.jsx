import React, { useState } from "react";
import TipoTareaSelector from "../components/tipoTareaSelector"; // ajusta el path si es necesario

export default function DocenteHome() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState("");
  const [restricciones, setRestricciones] = useState([]);

  const restriccionesDisponibles = [
    "While",
    "For",
    "If/else",
    "Break",
    "Continue",
    "Try/except"
  ];

  const agregarRestriccion = (e) => {
    const valor = e.target.value;
    if (valor && !restricciones.includes(valor)) {
      setRestricciones([...restricciones, valor]);
    }
  };

  const quitarRestriccion = (r) => {
    setRestricciones(restricciones.filter((item) => item !== r));
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-8">
      <h1 className="text-3xl font-bold mb-2">Bienvenido Docente</h1>
      <p className="mb-6 text-gray-700">
        Aquí podrás subir tus cursos próximamente.
      </p>

      <div className="bg-white shadow-md rounded-md p-10 border-y-0 border-l-4 border-r-4 border-gray-400 max-w-9xl">
        <h2 className="text-xl font-semibold mb-4">Añadir tarea</h2>
        <hr className="mb-4" />

        {/* Descripción */}
        <div className="mb-4">
          <label htmlFor="descripcion" className="block font-medium mb-1">
            Descripción:
          </label>
          <textarea
            id="descripcion"
            className="w-full h-32 p-2 border border-gray-300 rounded-md bg-gray-200 resize-none"
          ></textarea>
        </div>

        {/* Tipo de tarea */}
        <div className="mb-6">
          <label className="block font-medium mb-1">Tipo de tarea:</label>
          <TipoTareaSelector
            seleccionada={tipoSeleccionado}
            onSeleccionar={(tipo) => {
              setTipoSeleccionado(tipo);
              if (tipo !== "Tarea con Restricciones") {
                setRestricciones([]); // limpia si cambia tipo
              }
            }}
          />
        </div>

        {/* Restricciones si aplica */}
        {tipoSeleccionado === "Tarea con Restricciones" && (
          <div className="mb-6">
            <label className="block font-medium mb-1">Restricciones:</label>
            <div className="flex gap-4 items-start">
              <select
                onChange={agregarRestriccion}
                value=""
                className="border bg-black text-white py-1 px-3 rounded-md"
              >
                <option value="">--Seleccionar--</option>
                {restriccionesDisponibles.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>

              <div className="bg-gray-300 p-5 rounded-md min-w-[300px] min-h-[100px] w-full flex flex-wrap gap-3">
                  {restricciones.map((r, index) => (
                    <span
                      key={index}
                      className="bg-yellow-200 text-black px-4 py-2 rounded-md text-sm font-medium cursor-pointer hover:bg-yellow-300 transition"
                      onClick={() => quitarRestriccion(r)}
                    >
                      {r} ✕
                    </span>
                  ))}
                </div>


            </div>
          </div>
        )}

        {/* Botones */}
        <div className="flex justify-end space-x-2">
          <button className="bg-red-600 hover:bg-red-700 text-white py-1 px-4 rounded-md">
            Cancelar
          </button>
          <button className="bg-black hover:bg-gray-800 text-white py-1 px-4 rounded-md">
            Publicar
          </button>
        </div>
      </div>
    </div>
  );
}
