
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from '../components/botonCompilar'; // ajusta la ruta según tu estructura
import React, { useState } from "react";

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
      <h1 className="text-2xl font-bold mb-4">Página Código</h1>
      <p className="mb-6">Bienvenido a la página donde mostramos código y ejemplos.</p>
      <BotonCompilar onCompilar={manejarCompilacion} />
      {/* Aquí se muestra el resultado de la compilación */}
      <ResultadoCompilacion resultado={resultado} />
    </div>
  );
};

export default PaginaCodigo;
