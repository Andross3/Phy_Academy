import React from "react";
import { useState } from "react";
import { FaPython } from "react-icons/fa";
import CodeMirror from "@codemirror/lang-python";
import { python } from "@codemirror/lang-python";

const EntradaCodigo = ({ onChangeCode }) => {

    const palabrasResaltadas = ["print", "def", "return", "import"];

    const [code, setCode] = useState("");

    const handleChange = (event) => {
        // setCode(event.target.value);
        const nuevoCodigo = event.target.value;
        setCode(nuevoCodigo);
        onChangeCode(nuevoCodigo);
    };

    return (
        <>
            <div className="flex items-center bg-black border border-white border-b-0 p-2 w-fit -mt-2 ml-12 text-white font-semibold space-x-2">
                <FaPython size={20} className="text-blue-400" />
                <p className="text-white">Tarea_1.py</p>
            </div>
            <div className="border border-white bg-black w-full h-[350px] overflow-hidden">
                <div className="flex p-2">
                    <div className="text-right pr-4 pt-8 text-gray-400 w-10 flex flex-col items-end">
                        {code.split("\n").map((_, index) => (
                            <div className="text-blue-400" key={index}>{index + 1}
                            </div>))}
                    </div>
                    <textarea
                        className="flex-1 bg-black text-white border border-gray-600 p-4 pt-8 resize-none h-full overflow-auto"
                        style={{
                            scrollbarWidth: "thin",
                            scrollbarColor: "#555 #222"
                        }}
                        value={code}
                        onChange={handleChange}
                        rows={15} />
                </div>
            </div>
        </>
    );
};

export default EntradaCodigo;