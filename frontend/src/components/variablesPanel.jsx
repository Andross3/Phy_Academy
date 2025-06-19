import React from 'react';

const variablesPanel = ({ variables = [] }) => {
  return (
    <div className="w-full border border-white rounded shadow-lg bg-black text-white h-full overflow-auto">
  <div className="bg-gray-800 px-3 py-2 border-b border-white font-semibold w-[100px] text-center">
    Variables
  </div>

  <table className="table-auto w-full">
    <thead className="bg-gray-700 text-white sticky top-0">
      <tr>
        <th className="text-left px-2 py-1 border-b border-white">Nombre</th>
        <th className="text-left px-2 py-1 border-b border-white">Valor</th>
      </tr>
    </thead>
    <tbody>
      {variables.length === 0 ? (
        <tr>
          <td className="px-2 py-1 border-b border-white italic text-gray-300" colSpan={2}>Sin variables</td>
        </tr>
      ) : (
        variables.map((v, i) => (
          <tr key={i} className="border-b border-white">
            <td className="px-2 py-1">{v.name}</td>
            <td className="px-2 py-1">{v.value}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
</div>


  );
};

export default variablesPanel;
