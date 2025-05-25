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

export default function RegistroProfesor({ onBackToHome }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    correo: "",
    password: "",
    confirmPassword: "",
    telefono: "",
    pais: "",
    departamento: "",
    provincia: "",
    grado_academico: "",
    institucion_educativa: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: null });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre.trim()) newErrors.nombre = "El nombre es obligatorio";
    if (!formData.apellido.trim()) newErrors.apellido = "El apellido es obligatorio";
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.correo.trim()) {
      newErrors.correo = "El correo es obligatorio";
    } else if (!emailRegex.test(formData.correo)) {
      newErrors.correo = "Ingrese un correo válido";
    }
    if (!formData.password || formData.password.length < 8) {
      newErrors.password = "La contraseña debe tener al menos 8 caracteres";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
    }
    if (!formData.grado_academico.trim()) {
      newErrors.grado_academico = "El grado académico es obligatorio";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const { password, confirmPassword, ...rest } = formData;
      const docenteData = {
        ...rest,
        contrasena: password, // Este campo debe coincidir con el nombre esperado en el backend
      };

      const response = await fetch("http://127.0.0.1:5000/docentes/registrar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(docenteData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.mensaje || "Registro exitoso. ¡Bienvenido a PhyAcademy!");
        onBackToHome();
      } else {
        alert(data.error || "Hubo un error al registrar al docente.");
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      alert("Error al conectar con el servidor.");
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
        <form onSubmit={handleSubmit} className="w-full max-w-md bg-gray-800 bg-opacity-80 rounded-lg shadow-lg overflow-hidden p-8 border border-blue-500">
          <h2 className="text-white text-2xl font-bold mb-6 text-center">Registro de Profesor</h2>

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
              
              {/* Contacto */}
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
                <div className="mt-4">
                  <input 
                    type="text"
                    name="telefono"
                    placeholder="Teléfono"
                    value={formData.telefono}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Ubicación */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Ubicación</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <input 
                      type="text"
                      name="pais"
                      placeholder="País"
                      value={formData.pais}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                  <div>
                    <input 
                      type="text"
                      name="departamento"
                      placeholder="Departamento"
                      value={formData.departamento}
                      onChange={handleChange}
                      className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <input 
                    type="text"
                    name="provincia"
                    placeholder="Provincia"
                    value={formData.provincia}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Información Académica */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Formación Académica</h3>
                <div>
                  <input 
                    type="text"
                    name="grado_academico"
                    placeholder="Grado Académico"
                    value={formData.grado_academico}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                  {errors.grado_academico && <p className="text-red-500 text-sm mt-1">{errors.grado_academico}</p>}
                </div>
                <div className="mt-4">
                  <input 
                    type="text"
                    name="institucion_educativa"
                    placeholder="Institución Educativa"
                    value={formData.institucion_educativa}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />
                </div>
              </div>
              
              {/* Seguridad */}
              <div className="mb-2">
                <h3 className="text-blue-400 text-lg font-medium mb-2">Seguridad</h3>
                <div>
                  <input 
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    value={formData.password}
                    onChange={handleChange}
                    className="w-full p-2 bg-gray-700 text-white rounded-md border border-gray-600 focus:border-blue-500 focus:outline-none"
                  />                
                  {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
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
        </form>
      </div>
    </div>
  );
}
