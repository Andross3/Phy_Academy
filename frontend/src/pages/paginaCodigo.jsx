import React, { useState } from "react";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from "../components/botonCompilar";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";

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
        // Backend devolvió error de validación o dominio
        throw new Error(data.error || "Error desconocido");
      }

      const errores = (data.errores || "").trim();
      setResultado(errores);

      // Score: 1 si no hay errores, 0 si hay al menos uno
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
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-2 underline text-center">
          Tarea 1
        </h1>
        <p className="mb-2 pl-10 text-white text-xl text-left italic w-full">
          Hacer un programa que te devuelva ¡Hola Mundo!
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <BotonCompilar 
          onCompilar={manejarCompilacion} 
          disabled={loading || codigo.trim() === ""} 
        />
      </div>

      {loading && (
        <div className="mb-4 text-right">
          <em>Compilando...</em>
        </div>
      )}

      {score !== null && !loading && (
        <div className="mb-4 text-right">
          <strong>Calificación:</strong> {score.toFixed(1)}
        </div>
      )}

      {errorConn && (
        <div className="mb-4 text-red-400 text-right">
          <strong>Error:</strong> {errorConn}
        </div>
      )}

      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="w-full">
          <ArchivoCompilador />
        </div>

        <div className="w-full">
          <EntradaCodigo onChangeCode={setCodigo} value={codigo} />

          <ResultadoCompilacion resultado={resultado} />
        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
