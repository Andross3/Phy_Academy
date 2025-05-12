import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const StarryBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    
    // Set canvas to full window size
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    // Star properties
    const stars = [];
    const starCount = 200;

    // Create stars
    for (let i = 0; i < starCount; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        opacity: Math.random()
      });
    }

    // Animation loop
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
      className="fixed top-0 left-0 z-[-1] bg-black w-full h-full"
    />
  );
};

const Home = () => {
  const [typedText, setTypedText] = useState('');
  const fullText = 'Bienvenidos a: PhyAcademy';
  const [isTyping, setIsTyping] = useState(true);

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
    <div className="min-h-screen flex items-center justify-center relative">
      <StarryBackground />
      <div className="text-center z-10 relative">
        <h1 
          className="text-5xl text-white font-['Courier_New'] font-bold"
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
          className="text-white mt-2 mb-6 font-['Courier_New']"
        >
          Aprende python desde cero...
        </div>
        <div className="flex justify-center space-x-4">
           <Link to="/login">
              <button 
                className="px-6 py-2 border-2 border-white bg-white text-black hover:bg-gray-200 transition-colors duration-300 font-['Courier_New']"
              >
                Iniciar Sesion
              </button>
            </Link>
          <button 
            className="px-6 py-2 border-2 border-gray-500 bg-gray-500 text-white hover:bg-gray-600 transition-colors duration-300 font-['Courier_New']"
          >
            Registrarse
          </button>
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
};

export default Home;