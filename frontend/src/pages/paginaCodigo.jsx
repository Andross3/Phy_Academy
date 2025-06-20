import React, { useState } from "react";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";
import BarraFunciones from "../components/barraFunciones";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import VariablesPanel from "../components/variablesPanel";

const PaginaCodigo = () => {
  const [resultado, setResultado] = useState('');
  const [codigo, setCodigo] = useState('');
  const [titulo, setTitulo] = useState('Tarea 1');
  const [descripcion, setDescripcion] = useState('Hacer un programa que te devuelva ¡Hola Mundo!');
  const [restricciones, setRestricciones] = useState([]);
  const [codigoPlantilla, setCodigoPlantilla] = useState('');

  const manejarCompilacion = () => {
    fetch("http://127.0.0.1:5000/ejecutar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ codigo })
    })
      .then(res => res.json())
      .then(data => setResultado(data.mensaje))
      .catch(err => setResultado("Error al conectar: " + err.message));
  };

  const manejarSeleccionTarea = (idTarea) => {
    fetch(`http://127.0.0.1:5000/api/tareas/${idTarea}`)
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Error al obtener tarea");

        setTitulo(data.titulo || "Sin título");
        setDescripcion(data.descripcion || "");
        setRestricciones(data.restricciones || []);
        setCodigoPlantilla(data.codigo_plantilla || "");
        setCodigo(data.tipo_tarea === "plantilla" ? data.codigo_plantilla : "");
      })
      .catch(err => {
        setTitulo("Error al cargar tarea");
        setDescripcion(err.message);
        setRestricciones([]);
        setCodigoPlantilla("");
        setCodigo("");
      });
  };

  return (
    <div className="p-2 text-white">
      <div className="flex flex-col w-full pb-4 px-4">
        <h1 className="text-3xl font-bold mb-2 underline text-center text-white">{titulo}</h1>
        
        <div className="bg-gray-800 rounded-lg p-4 text-white shadow-md mb-2">
          <p className="text-xl italic mb-2">{descripcion}</p>

          {restricciones.length > 0 && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold underline">Restricciones:</h2>
              <ul className="list-disc list-inside ml-4 mt-1 text-white">
                {restricciones.map((r, i) => (
                  <li key={i}>{r}</li>
                ))}
              </ul>
            </div>
          )}

          {codigoPlantilla && (
            <div className="mt-4">
              <h2 className="text-lg font-semibold underline mb-1">Código Plantilla:</h2>
              <pre className="bg-black rounded-md p-3 overflow-x-auto whitespace-pre-wrap text-sm text-green-400">{codigoPlantilla}</pre>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-[300px_1fr_300px] gap-2">
        <div className="row-span-3">
          <ArchivoCompilador onSeleccionarTarea={manejarSeleccionTarea} />
        </div>

        <div className="flex flex-col gap-3">
          <BarraFunciones onCompilar={manejarCompilacion} />
          <EntradaCodigo onChangeCode={setCodigo} codigo={codigo} />
          <ResultadoCompilacion resultado={resultado} />
        </div>

        <div className="row-span-3 flex flex-col gap-2">
          <VariablesPanel variables={[{ name: 'x', value: 5 }, { name: 'y', value: 10 }]} />
        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
