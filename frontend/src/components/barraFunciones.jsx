import React from 'react';
import { FaPlay } from "react-icons/fa";
import { TfiSave } from "react-icons/tfi";
import { MdCleaningServices } from "react-icons/md";


const BarraFunciones = ({ onCompilar }) => {
  return (
    <div className='flex flex-row gap-2 h-[40px] border border-amber-50 rounded-sm'>
      <button  onClick={onCompilar} className="hover:bg-gray-100/20 p-2 ml-10 rounded-xl text-center" title="Compilar">
        <FaPlay size={20} className="hover:text-sky-700 text-white" />
      </button>

      <button className="hover:bg-gray-100/20 p-2 rounded-xl" title="Guardar">
        <TfiSave size={20} className="hover:text-sky-700" />
      </button>

      <button className="hover:bg-gray-100/20 p-2 rounded-xl" title="Limpiar">
        <MdCleaningServices size={20} className="hover:text-sky-700" />
      </button>

    </div>
  );
};

export default BarraFunciones;