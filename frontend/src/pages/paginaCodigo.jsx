
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from '../components/botonCompilar'; // ajusta la ruta según tu estructura
import React, { useState } from "react";
import EntradaCodigo from "../components/entradaCodigo";

const PaginaCodigo = () => {
    const [resultado, setResultado] = useState('');

    const manejarCompilacion = () => {
      const errores = `
  Error: línea 12: 'x' no está definido
  Error: línea 18: se esperaba ';'
  Error: línea 25: tipo de datos incompatible
      `;
      setResultado(errores);
    };
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tarea 1</h1>
      <p className="mb-6">Hcer un programa que te devuelva ¡Hola Mundo!</p>
      <BotonCompilar onCompilar={manejarCompilacion} />
      <EntradaCodigo></EntradaCodigo>
      <div className="flex justify-end">
      </div>
      {/* Aquí se muestra el resultado de la compilación */}
      <ResultadoCompilacion resultado={resultado} />

    </div>
  );
};

export default PaginaCodigo;
