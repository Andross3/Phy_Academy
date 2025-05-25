import React, { useState, useRef, useEffect } from "react";

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

export default function RegistroEstudiante({ onBackToHome }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    contraseña: "",
    confirmPassword: "",
    carrera: "",
    universidad: ""
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const e = {};
    if (!formData.nombre.trim()) e.nombre = "Requerido";
    if (!formData.apellido.trim()) e.apellido = "Requerido";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      e.correo = "El correo es obligatorio";
    } else if (!emailRegex.test(formData.correo)) {
      e.correo = "Correo inválido";
    }
    if (!formData.contraseña || formData.contraseña.length < 8) {
      e.contraseña = "Mínimo 8 caracteres";
    }
    if (formData.contraseña !== formData.confirmPassword) {
      e.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!formData.carrera.trim()) e.carrera = "Requerido";
    if (!formData.universidad.trim()) e.universidad = "Requerido";
    return e;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const val = validateForm();
    if (Object.keys(val).length > 0) {
      setErrors(val);
      return;
    }

    try {
      const payload = { ...formData };
      delete payload.confirmPassword;

      const res = await fetch("http://localhost:5000/estudiantes/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.ok) {
        alert(data.mensaje || "Registro exitoso");
        onBackToHome();
      } else {
        alert(data.error || "Error al registrar");
      }
    } catch (err) {
      alert("Error de conexión con el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col relative">
      <StarryBackground />

      <div className="bg-gray-800 bg-opacity-80 p-4 flex items-center justify-between relative z-10">
        <button
          onClick={onBackToHome}
          className="text-white flex items-center hover:text-blue-300 transition-colors"
        >
          <svg className="w-5 h-5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
          Volver a inicio
        </button>
        <div className="text-white text-xl font-bold">PhyAcademy</div>
        <div className="w-24"></div>
      </div>

      <div className="flex-grow flex items-center justify-center relative z-10 p-4">
        <div className="w-full max-w-md bg-gray-800 bg-opacity-80 rounded-lg shadow-lg overflow-hidden p-8 border border-blue-500">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Registro de Estudiante</h2>

          <div className="flex flex-col items-center">
            <div className="w-full space-y-4 overflow-y-auto max-h-96 pr-2">
              {/* Información Personal */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Información Personal</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text"
                      name="nombre"
                      placeholder="Nombre"
                      value={formData.nombre}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    {errors.nombre && <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>}
                  </div>
                  <div>
                    <input 
                      type="text"
                      name="apellido"
                      placeholder="Apellido"
                      value={formData.apellido}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                    {errors.apellido && <p className="text-red-500 text-sm mt-1">{errors.apellido}</p>}
                  </div>
                </div>
              </div>
              
              {/* Información de Contacto */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Información de Contacto</h3>
                <div>
                  <input 
                    type="email"
                    name="correo"
                    placeholder="Correo electrónico"
                    value={formData.correo}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.correo && <p className="text-red-500 text-sm mt-1">{errors.correo}</p>}
                </div>
              </div>
              
              {/* Información Académica */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Información Académica</h3>
                <div>
                  <input 
                    type="text"
                    name="carrera"
                    placeholder="Carrera"
                    value={formData.carrera}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.carrera && <p className="text-red-500 text-sm mt-1">{errors.carrera}</p>}
                </div>
                <div className="mt-4">
                  <input 
                    type="text"
                    name="universidad"
                    placeholder="Universidad"
                    value={formData.universidad}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.universidad && <p className="text-red-500 text-sm mt-1">{errors.universidad}</p>}
                </div>
              </div>
              
              {/* Seguridad */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Seguridad</h3>
                <div>
                  <input 
                    type="password"
                    name="contraseña"
                    placeholder="Contraseña"
                    value={formData.contraseña}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />                
                  {errors.contraseña && <p className="text-red-500 text-sm mt-1">{errors.contraseña}</p>}
                </div>
                <div className="mt-4">
                  <input 
                    type="password"
                    name="confirmPassword"
                    placeholder="Confirmar contraseña"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.confirmPassword && <p className="text-red-500 text-sm mt-1">{errors.confirmPassword}</p>}
                </div>
              </div>
            </div>
            
            <button 
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md transition-colors shadow-lg"
            >
              Registrarse
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}