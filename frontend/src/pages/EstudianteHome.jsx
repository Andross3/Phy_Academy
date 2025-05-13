import React, { useState, useEffect, useRef } from 'react';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const stars = [];
    const starCount = 200;

    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random()
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw stars
      stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 z-0 bg-black w-full h-full"
    />
  );
};

const CourseCard = ({ level, title, description, students, rating }) => {
  // Determine background color based on level
  const levelBgColor = {
    'Principiante': 'bg-green-500',
    'Intermedio': 'bg-blue-400',
    'Avanzado': 'bg-pink-500'
  }[level];

  return (
    <div className="bg-gray-900 rounded-lg p-5 w-full max-w-xs shadow-lg border border-gray-800">
      <div className="mb-3">
        <span className={`${levelBgColor} text-black px-3 py-1 rounded-full text-sm font-medium`}>
          {level}
        </span>
      </div>
      <h3 className="text-white font-bold mb-2">{title}</h3>
      <p className="text-gray-300 text-sm mb-4">{description}</p>
      <div className="flex items-center justify-between">
        <div className="flex items-center text-gray-400 text-sm">
          <svg viewBox="0 0 24 24" className="w-4 h-4 mr-1" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
            <circle cx="9" cy="7" r="4"></circle>
            <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
            <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
          </svg>
          {students}+
        </div>
      </div>
      <div className="flex mt-2">
        {[...Array(5)].map((_, i) => (
          <svg 
            key={i} 
            xmlns="http://www.w3.org/2000/svg" 
            width="16" 
            height="16" 
            viewBox="0 0 24 24" 
            fill={i < rating ? "currentColor" : "none"} 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className={i < rating ? 'text-yellow-400' : 'text-gray-500'}
          >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
          </svg>
        ))}
      </div>
    </div>
  );
};

export default function EstudianteHome() {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Bienvenido Estudiante';
  const [isTyping, setIsTyping] = useState(true);

  const courses = [
    {
      level: 'Principiante',
      title: 'Automatiza tu Vida con Python (Scripts Prácticos)',
      description: 'Aprende a crear scripts para automatizar tareas cotidianas: archivos, emails y más.',
      students: '3,400',
      rating: 5
    },
    {
      level: 'Intermedio',
      title: 'Hacking Ético con Python (Fundamentos)',
      description: 'Domina técnicas básicas de ciberseguridad con scripts Python.',
      students: '1,800',
      rating: 4
    },
    {
      level: 'Avanzado',
      title: 'Hacking Ético con Python (Fundamentos)',
      description: 'Domina técnicas básicas de ciberseguridad con scripts Python.',
      students: '1,800',
      rating: 4
    }
  ];
  
  useEffect(() => {
    if (isTyping && typedText.length < fullText.length) {
      const typingTimer = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 100);

      return () => clearTimeout(typingTimer);
    } else if (typedText.length === fullText.length) {
      setIsTyping(false);
    }
  }, [typedText, isTyping, fullText]);

  return (
    <div className="min-h-screen flex flex-col items-center relative py-10">
      <StarryBackground />
      <div className="text-center z-10 relative">
        <h1 
          className="text-5xl text-white font-mono font-bold"
        >
          {typedText}
          {isTyping && (
            <span 
              className="inline-block ml-2 animate-blink text-white"
            >
              |
            </span>
          )}
        </h1>
        <div 
          className="text-white mt-2 mb-10 font-mono"
        >
          Explora nuestros cursos y comienza tu aprendizaje en programación.
        </div>

        <div className="mb-10">
          <h2 className="text-white text-3xl font-mono mb-8">Mis Cursos</h2>
          <div className="flex flex-wrap gap-6 justify-center">
            {courses.map((course, index) => (
              <CourseCard 
                key={index}
                level={course.level}
                title={course.title}
                description={course.description}
                students={course.students}
                rating={course.rating}
              />
            ))}
          </div>
        </div>
      </div>
      <style>
        {`
          @keyframes blink {
            0% { opacity: 0; }
            50% { opacity: 1; }
            100% { opacity: 0; }
          }
          .animate-blink {
            animation: blink 0.7s infinite;
          }
        `}
      </style>
    </div>
  );
}