import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const [typedText, setTypedText] = useState("");
  const [showCursor, setShowCursor] = useState(true);
  const fullText = "Bienvenido a PhyAcademy";
  const typingSpeed = 100; // velocidad de escritura en ms
  const navigate = useNavigate();//para que el boton pueda llevarte a una pagina

  // Efecto para simular escritura letra por letra
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, typingSpeed);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  // Efecto para el cursor parpadeante
  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor((prev) => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  // Texto simple y descriptivo para mostrar en el editor
  const platformDescription = `
PhyAcademy - Tu portal para aprender Python

¿Qué es PhyAcademy?
PhyAcademy es una plataforma educativa donde puedes aprender a programar
en Python desde cero, sin necesidad de conocimientos previos.

Nuestros cursos incluyen:
• Python Básico: Aprende los fundamentos del lenguaje
• Algoritmos: Resuelve problemas paso a paso
• Estructuras de Datos: Organiza y manipula información
• Programación Orientada a Objetos: Crea aplicaciones robustas

Características de la plataforma:
• Editor en línea: Practica sin instalar nada en tu computadora
• Ejercicios interactivos: Aprende haciendo y recibe retroalimentación
• Tests automáticos: Verifica tu progreso en tiempo real

¡Únete a nuestra comunidad y comienza tu viaje en el mundo de la programación!
`;

  // Componente para crear las estrellas (puntos blancos)
  const Stars = () => {
    const starCount = 200;
    const stars = [];
    
    for (let i = 0; i < starCount; i++) {
      const size = Math.random() * 2;
      stars.push(
        <div
          key={i}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.8 + 0.2
          }}
        />
      );
    }
    
    return <>{stars}</>;
  };

  // Datos de los cursos
  const topCursos = [
    {
      nivel: "Principiante",
      nivelColor: "bg-green-400",
      titulo: "Automatiza tu Vida con Python (Scripts Prácticos)",
      descripcion: "Aprende a crear scripts para automatizar tareas cotidianas: archivos, emails y más.",
      estudiantes: "3,400+",
      estrellas: 5
    },
    {
      nivel: "Intermedio",
      nivelColor: "bg-blue-400",
      titulo: "Hacking Ético con Python (Fundamentos)",
      descripcion: "Domina técnicas básicas de ciberseguridad con scripts Python.",
      estudiantes: "1,800+",
      estrellas: 4
    },
    {
      nivel: "Avanzado",
      nivelColor: "bg-red-400",
      titulo: "Hacking Ético con Python (Fundamentos)",
      descripcion: "Domina técnicas básicas de ciberseguridad con scripts Python.",
      estudiantes: "1,800+",
      estrellas: 4 
    }
  ];

  // Componente para mostrar estrellas de calificación
  const RatingStars = ({ rating }) => {
    return (
      <div className="flex">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            className={`w-5 h-5 ${i < rating ? "text-yellow-400" : "text-gray-500"}`} 
            fill="currentColor" 
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118l-2.8-2.034c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
    );
  };

  // Componente para el separador con puntos
  const DotSeparator = () => {
    return (
      <div className="flex justify-center py-8">
        <div className="flex space-x-2">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="h-1 w-1 rounded-full bg-gray-600"></div>
          ))}
        </div>
      </div>
    );
  };

  // Componente para el ícono de Python flotante
  const PythonIcon = () => {
    return (
      <div className="absolute top-40 right-16 opacity-20">
        <svg className="w-32 h-32" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M63.391 1.988c-4.222.02-8.252.379-11.8 1.007-10.45 1.846-12.346 5.71-12.346 12.837v9.411h24.693v3.137h-33.961c-7.176 0-13.46 4.313-15.426 12.521-2.268 9.405-2.368 15.275 0 25.096 1.755 7.311 5.947 12.519 13.124 12.519h8.491v-11.282c0-8.151 7.051-15.34 15.426-15.34h24.665c6.866 0 12.346-5.654 12.346-12.548v-23.513c0-6.693-5.646-11.72-12.346-12.837-4.244-.706-8.645-1.027-12.866-1.008zm-13.354 7.569c2.55 0 4.634 2.117 4.634 4.721 0 2.593-2.083 4.69-4.634 4.69-2.56 0-4.633-2.097-4.633-4.69-.001-2.604 2.073-4.721 4.633-4.721z"
            fill="#347AB4" />
          <path 
            d="M91.682 28.38v10.966c0 8.5-7.208 15.655-15.426 15.655h-24.665c-6.756 0-12.346 5.783-12.346 12.549v23.515c0 6.691 5.818 10.628 12.346 12.547 7.816 2.297 15.312 2.713 24.665 0 6.216-1.801 12.346-5.423 12.346-12.547v-9.412h-24.664v-3.138h37.012c7.176 0 9.852-5.005 12.348-12.519 2.578-7.735 2.467-15.174 0-25.096-1.774-7.145-5.161-12.521-12.348-12.521h-9.268zm-13.873 59.569c2.561 0 4.634 2.097 4.634 4.692 0 2.602-2.074 4.719-4.634 4.719-2.55 0-4.633-2.117-4.633-4.719 0-2.595 2.083-4.692 4.633-4.692z"
            fill="#FFCA1D" />
        </svg>
      </div>
    );
  };

  // Componente para el ícono de código flotante
  const CodeIcon = () => {
    return (
      <div className="absolute bottom-40 left-16 opacity-20">
        <svg className="w-32 h-32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M8.293 6.293a1 1 0 0 1 1.414 0 1 1 0 0 1 0 1.414L5.414 12l4.293 4.293a1 1 0 0 1-1.414 1.414l-5-5a1 1 0 0 1 0-1.414l5-5z"
            fill="#4C566A" />
          <path 
            d="M15.707 6.293a1 1 0 0 0-1.414 0 1 1 0 0 0 0 1.414L18.586 12l-4.293 4.293a1 1 0 0 0 1.414 1.414l5-5a1 1 0 0 0 0-1.414l-5-5z"
            fill="#4C566A" />
        </svg>
      </div>
    );
  };
  
  // Componente para el pie de página
  const Footer = () => {
    return (
      <div className="relative z-10 w-full bg-gray-900 bg-opacity-95 py-4">
        <div className="flex flex-col items-center justify-center">
          {/* Íconos sociales */}
          <div className="flex space-x-8 mb-3">
            {/* Facebook */}
            <a 
              href="https://www.facebook.com/share/19XJZF6dST/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <div className="bg-blue-600 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.378 14.192 5 15.115 5H18V0h-3.808C10.596 0 9 1.583 9 4.615V8z" />
                </svg>
              </div>
            </a>
            
            {/* Instagram */}
            <a 
              href="https://www.instagram.com/lauraa._.fernandez?igsh=MWUxZXE2dHhjcHZuMw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <div className="bg-gradient-to-tr from-yellow-400 via-red-500 to-purple-600 rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </div>
            </a>
            
            {/* X (Twitter) */}
            <a 
              href="https://x.com/Maria_LauraFer?t=b9-kuFR5RhdSbILt5eEkvA&s=09" 
              target="_blank" 
              rel="noopener noreferrer"
              className="transition-transform hover:scale-110"
            >
              <div className="bg-black rounded-full p-2 w-10 h-10 flex items-center justify-center">
                <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </div>
            </a>
          </div>
          
          {/* Copyright */}
          <div className="text-gray-400 text-sm">
            ©2025 PhyAcademy. Todos los derechos reservados
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="relative h-screen w-full overflow-y-auto overflow-x-hidden bg-black">
      {/* Fondo de universo */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden z-0">
        <Stars />
      </div>

      {/* Barra superior con botones de navegación */}
      <div className="relative z-10 w-full p-4 flex justify-end">
        <div className="flex gap-4">
          <button 
            onClick={() => navigate("/login")} 
            className="bg-white text-black px-4 py-2 rounded font-medium hover:bg-gray-200 transition-colors"
          >
            Iniciar sesión
          </button>
          <button 
            className="bg-gray-500 text-white px-4 py-2 rounded font-medium hover:bg-gray-600 transition-colors"
          >
            Registrarse
          </button>
        </div>
      </div>
      
      {/* Título con efecto de tipeo */}
      <div className="relative z-10 w-full flex justify-center pt-20">
        <div className="text-white text-5xl font-bold">
          {typedText}
          <span className={`${showCursor ? 'opacity-100' : 'opacity-0'} transition-opacity`}>|</span>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen text-white pt-12 pb-20">
        {/* Recuadro del compilador */}
        <div className="w-3/4 max-w-3xl bg-gray-900 rounded-lg overflow-hidden shadow-lg">
          {/* Barra superior del compilador */}
          <div className="bg-gray-800 px-4 py-2 flex items-center">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="mx-auto text-sm font-medium">Acerca de PhyAcademy</div>
          </div>
          
          {/* Área de información */}
          <div className="p-4 overflow-auto h-64 font-mono text-sm">
            <pre className="text-green-400 whitespace-pre-wrap">
              {platformDescription}
            </pre>
          </div>
        </div>

        {/* Separador con puntitos */}
        <DotSeparator />

        {/* Sección Top Cursos */}
        <div className="w-full px-8 py-4 mb-8">
        <h2 className="text-white text-4xl font-mono mb-6 text-center">TOP CURSOS</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {topCursos.map((curso, index) => (
              <div key={index} className="bg-gray-900 bg-opacity-80 rounded-lg p-4 shadow-lg border border-gray-800">
                <div className="mb-3">
                  <span className={`${curso.nivelColor} text-black text-xs px-2 py-1 rounded-full`}>
                    {curso.nivel}
                  </span>
                </div>
                <h3 className="text-white text-lg font-bold mb-2">{curso.titulo}</h3>
                <p className="text-gray-400 text-sm mb-4">{curso.descripcion}</p>
                
                <div className="flex items-center mb-2">
                  <svg className="w-4 h-4 text-gray-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400 text-sm">{curso.estudiantes}</span>
                </div>
                
                <RatingStars rating={curso.estrellas} />
              </div>
            ))}
          </div>
        </div>


        {/* Sección Inscríbete con nosotros */}
        <div className="w-full text-center mb-16">
          <h2 className="text-white text-2xl font-mono">Inscríbete con nosotros</h2>
        </div>
      </div>
      
      {/* Pie de página */}
      <Footer />
    </div>
  );
}