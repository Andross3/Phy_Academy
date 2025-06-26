import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState(""); // Nuevo estado para contraseña
  const navigate = useNavigate();
  const profileImage = "/IconoPerfil.png";

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        // Guarda los datos del usuario en localStorage
        localStorage.setItem("userId", data.id);
        localStorage.setItem("userRole", data.role);
        localStorage.setItem("userName", data.nombre);
        localStorage.setItem("userEmail", data.correo);

        if (data.role === "docente") {
          navigate("/docente");
        }
        else if (data.role === "estudiante") {
          navigate("/estudiante");
        }
        else {
          alert("Rol no reconocido.");
        }
      } else {
        alert(data.error || "Error de autenticación.");
      }
    } catch (err) {
      console.error("Error en login:", err);
      alert("Error al conectar con el servidor.");
    }
  };

  return (
    <div className="flex h-screen bg-gray-600 items-center justify-center p-4">
      <div className="fixed left-1/2 transform -translate-x-1/2 flex items-center space-x-12">
        <div className="flex flex-col items-center">
          <div className="w-64 h-64 mb-4">
            <img
              src={profileImage}
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <p className="text-xl font-bold text-white text-center">
            ¡Inicia sesión en PhyAcademy para empezar!
          </p>
        </div>

        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center p-8"
          >
            <div className="w-full space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <input
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Iniciar Sesión
                </button>
              </div>
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>

      <div className="absolute top-4 right-4">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
          Registrate
        </button>
      </div>
    </div>
  );
}
