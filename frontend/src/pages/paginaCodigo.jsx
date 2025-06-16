import React, { useState } from "react";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from "../components/botonCompilar";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";
import BarraFunciones from "../components/barraFunciones";

const BACKEND_URL = "http://localhost:5000";
const PALABRAS_PROHIBIDAS = ["while", "for", "import"]; // <-- Añade las que quieras

const PaginaCodigo = () => {
  const [resultado, setResultado] = useState('');
  const [codigo, setCodigo] = useState('');

  const manejarCompilacion = () => {
    // console.log(codigo);
    fetch("http://127.0.0.1:5000/ejecutar", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ codigo }) 
    })
      .then(response => response.json())
      .then(data => {
        setResultado(data.mensaje);
      })
      .catch(error => {
        setResultado("Error al conectar con el backend: " + error.message);
      });

  //   const errores = `
  // Error: línea 12: 'x' no está definido
  // Error: línea 18: se esperaba ';'
  // Error: línea 25: tipo de datos incompatible
  //     `;
    // setResultado(errores);
  };

  return (
    <div className="p-6 text-white">
      {/* Título y descripción */}
      <div className="flex flex-col items-center w-full mb-4">
        <h1 className="text-3xl font-bold mb-2 underline text-center">
          Tarea 1
        </h1>
        <p className="text-xl italic text-left w-full px-10">
          Hacer un programa que te devuelva ¡Hola Mundo!
        </p>
      </div>

      {/* Botón de compilar */}
      <div className="flex justify-end mb-4">
        <BotonCompilar
          onCompilar={manejarCompilacion}
          disabled={loading || codigo.trim() === ""}
        />
      </div>

      {/* Indicadores de estado */}
      {loading && (
        <div className="mb-2 text-right">
          <em>Compilando...</em>
        </div>
      )}
      {score !== null && !loading && (
        <div className="mb-2 text-right">
          <strong>Calificación:</strong> {score.toFixed(1)}
        </div>
      )}
      {errorConn && (
        <div className="mb-2 text-red-400 text-right">
          <strong>Error:</strong> {errorConn}
        </div>
      )}

      {/* Contenido principal: grid de 3 columnas */}
      <div className="grid grid-cols-[300px_1fr_300px] gap-4">
        {/* Columna izquierda: mostrar archivo compilador */}
        <div className="border border-gray-600 rounded p-2">
          <ArchivoCompilador />
        </div>

        {/* Columna central: funciones, editor y resultados */}
        <div className="flex flex-col gap-4">
          <BarraFunciones onCompilar={manejarCompilacion} />
          <EntradaCodigo
            onChangeCode={setCodigo}
            value={codigo}
            restricciones={PALABRAS_PROHIBIDAS}
          />
          <ResultadoCompilacion
            resultado={resultado}
            erroresRestriccion={erroresRestriccion}
          />
        </div>

        {/* Columna derecha: entrada adicional (placeholder) */}
        <div className="border border-gray-600 rounded p-2">
          <input
            type="text"
            placeholder="Ingresa caracteres aquí"
            className="w-full p-2 border border-gray-400 rounded text-black"
          />
        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
