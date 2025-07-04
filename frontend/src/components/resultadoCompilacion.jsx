import React from "react";
import { useState } from "react";
import { FaCode } from "react-icons/fa";
import { TbBrandPowershell, TbRubberStampOff } from "react-icons/tb";
import { FaAnglesRight } from "react-icons/fa6";

export default function ResultadoCompilacion({ resultado }) {
  const [mostrarShell, setMostrarShell] = useState(TbRubberStampOff);
  const [mostrarPython, setMostrarPython] = useState(false);
  const [userCode, setUserCode] = useState('');
  const [output, setOutput] = useState('');
  async function response() {
    const response = await fetch(`/run-code`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code: userCode })
    });

    const data = await response.json();
    setOutput(data.output);
  }


  return (
    <>
      <div className="flex flex-col">
        <div className="flex gap-0">
          <button
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-400/100 text-black p-2 boder border-gray-300 "
            onClick={() => {
              setMostrarShell(true);
              setMostrarPython(false);
            }}>
            <FaCode />
            <span>Terminal</span>
          </button>

          <button
            className="flex items-center gap-2 bg-gray-200 hover:bg-gray-400/100 text-black p-2 boder border-gray-300 "
            onClick={() => {
              setMostrarPython(true);
              setMostrarShell(false);
            }}>
            <TbBrandPowershell />
            <span>Intérprete Python</span>
          </button>
        </div>
        <div className=" border-amber-50 border-2 bg-gray-200">
          {mostrarShell && (
            <div className={`p-4 w-full h-[120px] overflow-auto border border-black ${resultado?.includes("Error") ? "text-red-600" : "text-blue-900"
              }`}>
              <p style={{ whiteSpace: "pre-line"}}>
                {resultado ? resultado : 'Respuesta del programa'}
              </p>

            </div>
          )}
          {mostrarPython && (
            <div className="p-4 text-gray-800 w-full h-[120px] overflow-auto border border-black">
              <FaAnglesRight />
            </div>
          )}
        </div>
      </div>
    </>
  );
}
