import { useNavigate } from "react-router-dom";
import React, { useRef, useEffect } from "react";

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = Array.from({ length: 200 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
    }));

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach((star) => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });
      requestAnimationFrame(animate);
    };

    animate();
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 bg-black w-full h-full"
    />
  );
};

export default function SeleccionRolModal({ onSeleccion }) {
  const navigate = useNavigate();

  const seleccionarRol = (rol) => {
    onSeleccion(); // Oculta el modal
    if (rol === "docente") {
      navigate("/registroProfesor");
    } else if (rol === "estudiante") {
      navigate("/registroEstudiante");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50">
      <StarryBackground />
      <div className="bg-gray-800 bg-opacity-80 p-8 rounded-lg shadow-lg border border-blue-500 text-center space-y-6 max-w-md w-full mx-4 relative z-10">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold text-white">Selecciona tu rol</h2>
          <p className="text-gray-300 text-sm">¿Cómo deseas registrarte en la plataforma?</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <button
            onClick={() => seleccionarRol("estudiante")}
            className="px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md font-semibold shadow-lg transition-colors border border-blue-500"
          >
            <div className="flex items-center justify-center space-x-2">
             
              <span>Estudiante</span>
            </div>
          </button>
          
          <button
            onClick={() => seleccionarRol("docente")}
            className="px-8 py-4 bg-gray-600 hover:bg-gray-700 text-white rounded-md font-semibold shadow-lg transition-colors border border-gray-500"
          >
            <div className="flex items-center justify-center space-x-2">
              
              <span>Docente</span>
            </div>
          </button>
        </div>
        
        <div className="pt-2">
          <div className="w-full h-px bg-gray-600"></div>
        </div>
      </div>
    </div>
  );
}
import { useNavigate } from "react-router-dom";

export default function SeleccionRolModal({ onSeleccion }) {
  const navigate = useNavigate();

  const seleccionarRol = (rol) => {
    onSeleccion(); // Oculta el modal
    if (rol === "docente") {
      navigate("/registroProfesor");
    } else if (rol === "estudiante") {
      navigate("/registroEstudiante");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center space-y-4">
        <h2 className="text-xl font-semibold">¿Cómo deseas registrarte?</h2>
        <div className="flex justify-center gap-4">
          <button
            onClick={() => seleccionarRol("estudiante")}
            className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Estudiante
          </button>
          <button
            onClick={() => seleccionarRol("docente")}
            className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
          >
            Docente
          </button>
        </div>
      </div>
    </div>
  );
}


