
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from '../components/botonCompilar'; // ajusta la ruta según tu estructura
import React, { useState } from "react";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";
import BarraFunciones from "../components/barraFunciones";

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
    <div className="p-2 text-white">
      <div className="flex flex-col items-center w-full pb-2">
        <h1 className="text-3xl font-bold mb-2 underline text-center">Tarea 1</h1>
        <p className="mb-4 pl-10 text-white text-xl text-left italic w-full">Hacer un programa que te devuelva ¡Hola Mundo!</p>
      </div>
      <div className="grid grid-cols-[300px_1fr_300px] gap-2">
        <div className="row-span-3">
          <ArchivoCompilador></ArchivoCompilador>
        </div>
        <div className="flex flex-col gap-3">
          <BarraFunciones onCompilar={manejarCompilacion} ></BarraFunciones>
          <EntradaCodigo onChangeCode={setCodigo}></EntradaCodigo>
          <ResultadoCompilacion resultado={resultado} />
        </div>
        <div className="row-span-3">
          <input type="text" placeholder="Ingresa caracteres aquí" className="p-2 border border-gray-400 rounded" />
        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
