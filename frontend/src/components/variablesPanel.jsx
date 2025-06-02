import React from 'react';

const variablesPanel = ({ variables = [] }) => {
  return (
    <div className="w-full border rounded shadow bg-white text-black h-full overflow-auto">
      <div className="bg-gray-200 px-3 py-2 border-b font-semibold w-[100px] text-center">
  Variables
</div>

      <table className="table-auto w-full">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            <th className="text-left px-2 py-1 border-b">Nombre</th>
            <th className="text-left px-2 py-1 border-b">Valor</th>
          </tr>
        </thead>
        <tbody>
          {variables.length === 0 ? (
            <tr>
              <td className="px-2 py-1 border-b italic text-gray-500" colSpan={2}>Sin variables</td>
            </tr>
          ) : (
            variables.map((v, i) => (
              <tr key={i}>
                <td className="px-2 py-1 border-b">{v.name}</td>
                <td className="px-2 py-1 border-b">{v.value}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default variablesPanel;
