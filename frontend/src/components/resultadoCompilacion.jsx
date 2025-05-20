import { FaCode } from "react-icons/fa";
export default function ResultadoCompilacion({ resultado }) {
    return (
      <div className="mt-10 border border-black bg-gray-300 w-full min-h-[150px]">
        <div className="ml-12 flex items-center gap-2 bg-gray-200 border border-black border-b-0 px-3 py-1 w-fit -mt-3 ml-2 text-black font-semibold">
          <FaCode /> Shell
        </div>
        <div className="p-4 text-gray-800 whitespace-pre-wrap">
          {resultado ? resultado : 'Respuesta del programa'}
           <hr className=" border-t border-dashed border-gray-500 my-2" />
          <hr className=" mt-5 border-t border-dashed border-gray-500 my-2" />
           <hr className=" mt-5 border-t border-dashed border-gray-500 my-2" />
        </div>
      </div>
    );
  }
  