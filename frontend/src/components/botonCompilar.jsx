import React from 'react';

const BotonCompilar = ({ onCompilar }) => {
  return (
    <button
      onClick={onCompilar}
      className="bg-black text-white px-4 py-2 rounded-md"
    >
      Compilar
    </button>
  );
};

export default BotonCompilar;
