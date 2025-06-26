import { useState } from "react";

export default function AniadirCurso({ onClose, onCursoCreado, idDocente }) {
  const [nombre, setNombre] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!nombre.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }
    try {
        const response = await fetch(`/api/curso`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nombre,
          descripcion,
          id_docente: idDocente,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        onCursoCreado();
        setNombre("");
        setDescripcion("");
      } else {
        setError(data.error || "Error al crear el curso.");
      }
    } catch (err) {
      setError("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="fixed inset-0 bg-transparent flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">Añadir Curso</h2>
        <form onSubmit={handleSubmit}>
          <input
            className="w-full mb-2 p-2 border rounded"
            placeholder="Nombre del curso"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
            required
          />
          <textarea
            className="w-full mb-2 p-2 border rounded"
            placeholder="Descripción"
            value={descripcion}
            onChange={e => setDescripcion(e.target.value)}
          />
          {error && (
            <div className="text-red-600 text-sm mb-2">{error}</div>
          )}
          <div className="flex justify-end">
            <button
              type="button"
              className="mr-2 px-4 py-2 rounded border"
              onClick={onClose}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Crear
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
