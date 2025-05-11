export default function ResultadoCompilacion({ resultado }) {
    return (
      <div className="mt-4 border border-black bg-[#edeadd] w-full">
        <div className="bg-[#ded9c6] border border-black border-b-0 px-3 py-1 w-fit -mt-3 ml-2 text-black font-semibold">
          Shell
        </div>
        <div className="p-4 text-gray-600 whitespace-pre-wrap">
          {resultado ? resultado : 'Respuesta del programa'}
        </div>
      </div>
    );
  }
  