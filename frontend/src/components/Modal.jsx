import React from 'react';

export default function Modal({ isOpen, message, type, onClose }) {
  if (!isOpen) return null;

  const bgColor = type === 'success' ? 'bg-green-100' : 'bg-red-100';
  const textColor = type === 'success' ? 'text-green-800' : 'text-red-800';
  const borderColor = type === 'success' ? 'border-green-400' : 'border-red-400';

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className={`${bgColor} border ${borderColor} rounded-lg p-6 max-w-md w-full mx-4 shadow-lg`}>
        <div className="flex items-center justify-between mb-4">
          <h3 className={`text-lg font-medium ${textColor}`}>
            {type === 'success' ? '¡Éxito!' : 'Error'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <p className={`${textColor} mb-4`}>{message}</p>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className={`px-4 py-2 rounded ${
              type === 'success' 
                ? 'bg-green-500 hover:bg-green-600 text-white' 
                : 'bg-red-500 hover:bg-red-600 text-white'
            }`}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
} 