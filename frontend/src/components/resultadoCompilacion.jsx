import React from "react";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { TbBrandPowershell } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";

const ResultadoCompilacion = ({ resultado, erroresRestriccion }) => {
  return (
    <div className="mt-4 bg-gray-900 p-4 rounded-lg">
      <h3 className="font-bold text-lg mb-2">Resultado:</h3>
      
      {erroresRestriccion && erroresRestriccion.length > 0 ? (
        <div className="text-red-400">
          <h4 className="font-bold">Restricciones:</h4>
          {erroresRestriccion.map((error, i) => (
            <p key={i}>- {error.mensaje} (Línea {error.linea})</p>
          ))}
        </div>
      ) : null}
      
      {resultado ? (
        <pre className="text-red-400 whitespace-pre-wrap">{resultado}</pre>
      ) : (
        <p className="text-green-400">¡El código se ejecutó correctamente!</p>
      )}
    </div>
  );
};
