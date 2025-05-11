import React from "react";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from '../components/botonCompilar'; // ajusta la ruta según tu estructura


const PaginaCodigo = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Página Código</h1>
      <p className="mb-6">Bienvenido a la página donde mostramos código y ejemplos.</p>
      <BotonCompilar/>
      {/* Aquí se muestra el resultado de la compilación */}
      <ResultadoCompilacion />
    </div>
  );
};

export default PaginaCodigo;
