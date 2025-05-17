
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from '../components/botonCompilar'; // ajusta la ruta según tu estructura
import React, { useState } from "react";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";

const PaginaCodigo = () => {
  const [resultado, setResultado] = useState('');
  const [codigo, setCodigo] = useState('');

  const manejarCompilacion = () => {
    console.log(codigo);

    // fetch("http://127.0.0.1:5000/compilar", 
    //   method 
    // )

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
      <div className="grid grid-cols-2 gap-4">
        <div>
          <ArchivoCompilador></ArchivoCompilador>
        </div>
        <div>
          <EntradaCodigo onChangeCode={setCodigo}></EntradaCodigo>
          <div className="flex justify-end">
          </div>
          {/* Aquí se muestra el resultado de la compilación */}
          <ResultadoCompilacion resultado={resultado} />

        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
