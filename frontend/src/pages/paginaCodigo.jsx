import React, { useState, useEffect } from "react";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from '../components/botonCompilar';
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";
import BarraFunciones from "../components/barraFunciones";
import VariablesPanel from "../components/variablesPanel";
import { useLocation } from "react-router-dom";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const PaginaCodigo = () => {
  const query = useQuery();
  const tareaId = query.get("tareaId");

  const [tarea, setTarea] = useState(null);
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [restricciones, setRestricciones] = useState([]);
  const [codigoPlantilla, setCodigoPlantilla] = useState('');
  const [codigo, setCodigo] = useState('');
  const [tareaSeleccionada, setTareaSeleccionada] = useState(null);
  const [resultado, setResultado] = useState('');
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    if (tareaId) {
      fetch(`/api/tareas/${tareaId}`)
        .then(res => res.json())
        .then(data => {
          setTarea(data);
          setTitulo(data.titulo || "Sin título");
          setDescripcion(data.descripcion || "");
          setRestricciones(data.restricciones || []);
          setCodigoPlantilla(data.codigo_plantilla || "");
          setCodigo(data.tipo_tarea === "plantilla" ? data.codigo_plantilla : "");
          setTareaSeleccionada(data);
        });
    }
  }, [tareaId]);

  const manejarCompilacion = () => {
    if (!tareaSeleccionada?.id) {
      setResultado("Selecciona una tarea antes de compilar.");
      return;
    }
    fetch(`/ejecutar`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        codigo,
        tarea_id: tareaSeleccionada.id
      })
    })
      .then(res => res.json())
      .then(data => setResultado(data.mensaje))
      .catch(err => setResultado("Error al conectar: " + err.message));
  };

  const manejarSeleccionTarea = (idTarea) => {
    fetch(`/api/tareas/${idTarea}`)
      .then(async res => {
        const data = await res.json();
        if (!res.ok) throw new Error(data?.error || "Error al obtener tarea");

        setTitulo(data.titulo || "Sin título");
        setDescripcion(data.descripcion || "");
        setRestricciones(data.restricciones || []);
        setCodigoPlantilla(data.codigo_plantilla || "");
        setCodigo(data.tipo_tarea === "plantilla" ? data.codigo_plantilla : "");
        setTareaSeleccionada(data);
        setTarea(data);
      })
      .catch(err => {
        setTitulo("Error al cargar tarea");
        setDescripcion(err.message);
        setRestricciones([]);
        setCodigoPlantilla("");
        setCodigo("");
        setTareaSeleccionada(null);
        setTarea(null);
      });
  };

  const manejarVariables = () => {
    fetch(`/extraer-variables`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ codigo })
    })
      .then(response => response.json())
      .then(data => {
        setVariables(data.variables);
        console.log("Variables extraídas:", data.variables);
      })
      .catch(error => {
        console.error("Error al conectar con el backend:", error.message);
        setVariables([]);
      });
  };

  return (
    <div className="p-2 text-white">
      <div className="flex flex-col w-full pb-4 px-4">
        {tarea && (
          <div className="bg-gray-800 rounded-lg p-4 text-white shadow-md mb-2">
            <h1 className="text-3xl font-bold mb-2 underline text-center text-white">{tarea.titulo}</h1>
            <p className="text-xl italic mb-2">{tarea.descripcion}</p>
            {Array.isArray(tarea.restricciones) && tarea.restricciones.length > 0 && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold underline">Restricciones:</h2>
                <ul className="list-disc list-inside ml-4 mt-1 text-white">
                  {tarea.restricciones.map((r, i) => (
                    <li key={i}>{r}</li>
                  ))}
                </ul>
              </div>
            )}
            {tarea.codigo_plantilla && (
              <div className="mt-4">
                <h2 className="text-lg font-semibold underline mb-1">Código Plantilla:</h2>
                <pre className="bg-black rounded-md p-3 overflow-x-auto whitespace-pre-wrap text-sm text-green-400">{tarea.codigo_plantilla}</pre>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="grid grid-cols-[300px_1fr_300px] gap-2">
        <div className="row-span-3">
          <ArchivoCompilador onSeleccionarTarea={manejarSeleccionTarea} />
        </div>

        <div className="flex flex-col gap-3">
          <BarraFunciones onCompilar={manejarCompilacion} onExtraerVariables={manejarVariables}/>
          <EntradaCodigo onChangeCode={setCodigo} codigo={codigo} />
          <ResultadoCompilacion resultado={resultado} />
        </div>

        <div className="row-span-3 flex flex-col gap-2">
          <VariablesPanel variables={variables} />
        </div>

      </div>
    </div>
  );
};

export default PaginaCodigo;
