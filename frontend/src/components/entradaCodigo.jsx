import React from "react";
import { useState } from "react";

const EntradaCodigo = ({onChangeCode}) => {

    const [code, setCode] = useState("");

    const handleChange = (event) => {
        // setCode(event.target.value);
        const nuevoCodigo = event.target.value;
        setCode(nuevoCodigo);
        onChangeCode(nuevoCodigo);
    };

    return (
        <div className="mt-4 border border-white bg-black w-full">
            <div className="bg-black border border-black border-b-0 px-3 py-1 w-fit -mt-3 ml-2 text-white font-semibold">
                <p>Tarea_1.py</p>
            </div>
            <div className="flex p-4">
                <div className="text-right pr-2 text-gray-400">
                    {code.split("\n").map((_, index) => (
                        <div key={index}>{index + 1}</div>
                    ))}
                </div>
                <textarea
                    className="flex-1 bg-black text-white border border-gray-600 p-2"
                    value={code}
                    onChange={handleChange}
                    rows={10}
                />
            </div>
        </div>
    );
};

export default EntradaCodigo;