import React, { useState } from "react";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from "../components/botonCompilar";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";
import BarraFunciones from "../components/barraFunciones";

const BACKEND_URL = "http://localhost:5000";

const PaginaCodigo = () => {
  const [codigo, setCodigo] = useState("");
  const [resultado, setResultado] = useState("");
  const [score, setScore] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errorConn, setErrorConn] = useState(null);

  const manejarCompilacion = async () => {
    setLoading(true);
    setErrorConn(null);
    setResultado("");
    setScore(null);

    try {
      const res = await fetch(`${BACKEND_URL}/compile`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ codigo }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Error desconocido");
      }

      const errores = (data.errores || "").trim();
      setResultado(errores);
      setScore(errores === "" ? 1 : 0);
    } catch (err) {
      setErrorConn(err.message);
      setScore(0);
    } finally {
      setLoading(false);
    }
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
          <EntradaCodigo onChangeCode={setCodigo} value={codigo} />
          <ResultadoCompilacion resultado={resultado} />
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
