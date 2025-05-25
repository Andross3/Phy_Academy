import React, { useState } from "react";

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
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Registro de Estudiante</h2>

        {["nombre", "apellido", "correo", "contraseña", "confirmPassword", "carrera", "universidad"].map((field, index) => (
          <div key={index} className="mb-2">
            <input
              type={field.includes("contraseña") ? "password" : "text"}
              name={field}
              placeholder={field === "confirmPassword" ? "Confirmar contraseña" : field.charAt(0).toUpperCase() + field.slice(1)}
              value={formData[field]}
              onChange={handleChange}
              className="w-full border p-2 rounded"
            />
            {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
          </div>
        ))}

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded w-full hover:bg-blue-700">
          Registrarse
        </button>
      </form>
    </div>
  );
}

