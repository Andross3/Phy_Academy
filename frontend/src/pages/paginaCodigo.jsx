import React, { useState, useEffect } from "react";
import ResultadoCompilacion from "../components/resultadoCompilacion";
import BotonCompilar from "../components/botonCompilar";
import EntradaCodigo from "../components/entradaCodigo";
import ArchivoCompilador from "../components/archivoCompilador";

const PaginaCodigo = () => {
  const [resultado, setResultado] = useState("");
  const [codigo, setCodigo] = useState("");
  const [pyodide, setPyodide] = useState(null);
  const [loading, setLoading] = useState(true);

// Añade función para cargar pyodide desde global
const loadPyodideFromWindow = () => window.loadPyodide();

useEffect(() => {
  async function initPyodide() {
    try {
      setLoading(true);
      const py = await loadPyodideFromWindow();
      setPyodide(py);
    } catch (e) {
      console.error("Error cargando Pyodide:", e);
      setResultado("Error cargando Pyodide");
    } finally {
      setLoading(false);
    }
  }
  initPyodide();
}, []);

  useEffect(() => {
    async function initPyodide() {
      try {
        setLoading(true);
        const py = await loadPyodide();
        setPyodide(py);
      } catch (e) {
        console.error("Error cargando Pyodide:", e);
        setResultado("Error cargando Pyodide");
      } finally {
        setLoading(false);
      }
    }
    initPyodide();
  }, []);

  const manejarCompilacion = async () => {
    if (!pyodide) {
      setResultado("Pyodide no está cargado aún.");
      return;
    }
    try {
      // Para evitar errores con código vacío
      if (!codigo.trim()) {
        setResultado("Por favor escribe algo de código.");
        return;
      }
      // Ejecuta el código Python capturando salida y errores
      const script = `
import sys
import io

stdout = io.StringIO()
stderr = io.StringIO()
sys.stdout = stdout
sys.stderr = stderr

try:
${codigo
  .split("\n")
  .map(line => "    " + line)
  .join("\n")}
except Exception as e:
    print(e, file=sys.stderr)

sys.stdout = sys.__stdout__
sys.stderr = sys.__stderr__

stdout.getvalue(), stderr.getvalue()
      `;

      const [stdout, stderr] = await pyodide.runPythonAsync(script);

      if (stderr) setResultado(`Error:\n${stderr}`);
      else setResultado(stdout || "El código no produjo salida.");
    } catch (error) {
      setResultado(`Error ejecutando código:\n${error.message}`);
    }
  };

  return (
    <div className="p-6 text-white">
      <div className="flex flex-col items-center w-full">
        <h1 className="text-3xl font-bold mb-2 underline text-center">Tarea 1</h1>
        <p className="mb-2 pl-10 text-white text-xl text-left italic w-full">
          Hacer un programa que te devuelva ¡Hola Mundo!
        </p>
      </div>

      <div className="flex justify-end mb-4">
        <BotonCompilar onCompilar={manejarCompilacion} />
      </div>

      {loading && <p>Cargando entorno Python en el navegador...</p>}

      <div className="grid grid-cols-[1fr_2fr] gap-4">
        <div className="w-full">
          <ArchivoCompilador />
        </div>
        <div className="w-full">
          <EntradaCodigo onChangeCode={setCodigo} />
          <ResultadoCompilacion resultado={resultado} />
        </div>
      </div>
    </div>
  );
};

export default PaginaCodigo;
