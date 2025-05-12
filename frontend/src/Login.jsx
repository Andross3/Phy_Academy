import React, { useState, useRef } from 'react';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState('/IconoPerfil.png');
  const fileInputRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add login logic here
    console.log('Login attempt', { email, password });
  };

  const handleProfileImageClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen bg-gray-600 items-center justify-center p-4">
      <div className="fixed left-1/2 transform -translate-x-1/2 flex items-center space-x-12">
        <div className="flex flex-col items-center">
          <div 
            className="w-64 h-64 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={handleProfileImageClick}
          >
            <img 
              src={profileImage}
              alt="Profile" 
              className="w-full h-full object-cover rounded-full"
            />
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />
          </div>
          <p className="text-xl font-bold text-white text-center">
            ¡Inicia sesión en PhyAcademy para empezar!
          </p>
        </div>
        
        <div className="w-full max-w-md bg-white rounded-lg shadow-md overflow-hidden">
          <div className="flex flex-col items-center p-8">
            <div className="w-full space-y-4">
              <div>
                <input 
                  type="email" 
                  placeholder="Email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <input 
                  type="password" 
                  placeholder="Contraseña" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <button 
                  onClick={handleSubmit}
                  className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-300"
                >
                  Inicio de Sesion
                </button>
              </div>
              <div className="text-center">
                <a href="#" className="text-sm text-blue-600 hover:underline">
                  ¿Olvidaste la contraseña?
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute top-4 right-4">
        <button className="bg-yellow-500 text-white px-4 py-2 rounded-md">
          Registrate
        </button>
      </div>
    </div>
  );
};

export default Login;