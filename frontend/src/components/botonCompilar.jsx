import React from 'react';


const BotonCompilar = ({ onCompilar }) => {
  return (
    <button
      onClick={onCompilar}
      className="border border-white text-white bg-transparent px-4 py-2 rounded-md transition duration-300 hover:bg-white hover:text-black"
    > Compilar
    </button>
  );
};

export default BotonCompilar;
