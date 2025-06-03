import React from "react";
import { useState } from "react";
import Editor from "react-simple-code-editor";
import Prism from "prismjs";
import { FaPython } from "react-icons/fa";
import "prismjs/components/prism-python";
import 'prismjs/themes/prism-okaidia.css'; 

const EntradaCodigo = ({ onChangeCode, value, restricciones }) => {
  const highlightKeywords = (text) => {
    if (!restricciones || restricciones.length === 0) return text;
    
    const regex = new RegExp(`\\b(${restricciones.join('|')})\\b`, 'gi');
    return text.replace(regex, '<span class="text-red-500 font-bold">$1</span>');
  };

  return (
    <div className="relative">
      <textarea
        className="w-full h-64 bg-gray-800 text-white p-4 font-mono rounded-lg"
        onChange={(e) => onChangeCode(e.target.value)}
        value={value}
        spellCheck="false"
      />
      {restricciones && restricciones.length > 0 && (
        <div className="absolute bottom-2 left-2 text-xs text-gray-400">
          Palabras prohibidas: {restricciones.join(', ')}
        </div>
      )}
    </div>
  );
};

export default EntradaCodigo;