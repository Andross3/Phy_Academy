import React from "react";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { FaPython } from "react-icons/fa";
import "prismjs/components/prism-python";
import 'prismjs/themes/prism-okaidia.css'; // Puedes cambiar el tema

const EntradaCodigo = ({ onChangeCode }) => {
  const [code, setCode] = useState("");

  const handleChange = (nuevoCodigo) => {
    setCode(nuevoCodigo);
    onChangeCode(nuevoCodigo);
  };

  return (
    <div className="flex flex-col h-300px w-full">
      <div className="flex items-center bg-black border border-white border-b-0 w-fit p-1 -mt-2 ml-12 text-white font-semibold space-x-2">
        <FaPython size={20} className="text-blue-400" />
        <p className="text-white">Tarea_1.py</p>
      </div>
      <div className="border border-white bg-black w-full h-[300px] overflow-auto">
        <div className="flex p-2">
          {/* Numeración de líneas */}
          <div className="text-right pr-4 pt-2 text-gray-400 w-10 flex flex-col items-end select-none ">
            {code.split("\n").map((_, index) => (
              <div className="text-blue-400" key={index}>{index + 1}</div>
            ))}
          </div>

          {/* Editor con resaltado */}
            <Editor
              className="flex-1 bg-black text-white border border-gray-600 p-4 pt-8 resize-none h-full overflow-auto"
              style={{
                scrollbarWidth: "thin",
                scrollbarColor: "#555 #222"
              }}
              value={code}
              onValueChange={handleChange}
              highlight={code =>
                Prism.highlight(code, Prism.languages.python, "python")
              }
              padding={10}
            />
        </div>
      </div>
    </div>
  );
};

export default EntradaCodigo;