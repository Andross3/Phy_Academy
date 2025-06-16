import React, { useState } from 'react';
import EntradaCodigo from './entradaCodigo';

export default function TareaPlantilla() {
  const [codigo, setCodigo] = useState('');

  return (
    <div className="mt-6">
      <label className="block text-gray-700 mb-2">Estructura:</label>
      <div className="bg-gray-300 rounded-lg p-4">
        <EntradaCodigo onChangeCode={setCodigo} />
      </div>
    </div>
  );
} 