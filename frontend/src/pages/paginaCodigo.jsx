
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
    <div className="p-6 text-white">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-2 underline text-center">Tarea 1</h1>
        <p className="mb-2 pl-10 text-white text-xl text-left italic w-full">Hacer un programa que te devuelva ¡Hola Mundo!</p>
      </div>
      <div className="flex justify-end">
        <BotonCompilar onCompilar={manejarCompilacion} /></div>
      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="w-full">
          <ArchivoCompilador></ArchivoCompilador>
        </div>
        <div className="w-full">
          <EntradaCodigo onChangeCode={setCodigo}></EntradaCodigo>
          <div className="flex justify-end">
          </div>
          <ResultadoCompilacion resultado={resultado} />
        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
