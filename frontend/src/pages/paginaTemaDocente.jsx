import React, { useEffect, useState } from 'react';
import Modal from '../components/Modal';
import { useParams } from 'react-router-dom';
import FormularioTarea from '../components/FormularioTarea';

// Fondo de estrellas (copiado de EstudianteHome)
const StarryBackground = () => {
  const canvasRef = React.useRef(null);
  React.useEffect(() => {
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
      stars.forEach(star => {
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
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 bg-black w-full h-full"
      style={{ pointerEvents: "none" }}
    />
  );
};

export default function PaginaTemaDocente() {
  const { id } = useParams(); // id del curso
  const [curso, setCurso] = useState(null);
  const [temas, setTemas] = useState([]);
  const [showTemaModal, setShowTemaModal] = useState(false);
  const [nuevoTema, setNuevoTema] = useState('');
  const [showTareaModal, setShowTareaModal] = useState(false);
  const [temaSeleccionado, setTemaSeleccionado] = useState(null);
  const [nuevaTarea, setNuevaTarea] = useState({ titulo: '', descripcion: '', tipo_tarea: '', fecha_entrega: '', hora_entrega: '' });
  const [modal, setModal] = useState({ isOpen: false, message: '', type: 'success' });
  const [editTarea, setEditTarea] = useState(null);

  // Cargar datos del curso y temas
  useEffect(() => {
    fetch(`http://localhost:5000/api/docente/${localStorage.getItem('userId')}/cursos`)
      .then(res => res.json())
      .then(data => {
        const cursoData = (Array.isArray(data) ? data : data.cursos).find(c => c.id === parseInt(id));
        setCurso(cursoData);
      });
    fetch(`http://localhost:5000/api/curso/${id}/temas`)
      .then(res => res.json())
      .then(data => setTemas(data.temas || []));
  }, [id]);

  // Añadir tema
  const handleAddTema = async () => {
    if (!nuevoTema.trim()) return;
    const res = await fetch('http://localhost:5000/api/tema', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id_curso: id, nombre: nuevoTema })
    });
    if (res.ok) {
      setNuevoTema('');
      setShowTemaModal(false);
      fetch(`http://localhost:5000/api/curso/${id}/temas`).then(r => r.json()).then(data => setTemas(data.temas || []));
      setModal({ isOpen: true, message: 'Tema creado exitosamente', type: 'success' });
    } else {
      setModal({ isOpen: true, message: 'Error al crear tema', type: 'error' });
    }
  };

  // Añadir tarea a un tema
  const handleAddTarea = async () => {
    const { titulo, descripcion, tipo_tarea, fecha_entrega, hora_entrega } = nuevaTarea;
    if (!titulo || !descripcion || !tipo_tarea || !fecha_entrega || !hora_entrega) return;
    const res = await fetch('http://localhost:5000/api/tarea', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...nuevaTarea, id_tema: temaSeleccionado })
    });
    if (res.ok) {
      setNuevaTarea({ titulo: '', descripcion: '', tipo_tarea: '', fecha_entrega: '', hora_entrega: '' });
      setShowTareaModal(false);
      fetch(`http://localhost:5000/api/curso/${id}/temas`).then(r => r.json()).then(data => setTemas(data.temas || []));
      setModal({ isOpen: true, message: 'Tarea creada exitosamente', type: 'success' });
    } else {
      setModal({ isOpen: true, message: 'Error al crear tarea', type: 'error' });
    }
  };

  const handleDeleteTarea = async (tareaId) => {
    const res = await fetch(`http://localhost:5000/api/tareas/${tareaId}`, { method: 'DELETE' });
    if (res.ok) {
      fetch(`http://localhost:5000/api/curso/${id}/temas`).then(r => r.json()).then(data => setTemas(data.temas || []));
      setModal({ isOpen: true, message: 'Tarea eliminada exitosamente', type: 'success' });
    } else {
      setModal({ isOpen: true, message: 'Error al eliminar tarea', type: 'error' });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 flex flex-col items-center relative">
      <StarryBackground />
      <div className="w-full max-w-4xl bg-white rounded-xl shadow p-6 mb-8 relative z-10">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">{curso?.nombre || 'Curso'}</h1>
        <p className="text-gray-600 mb-4">{curso?.descripcion}</p>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-700">Temas creados</h2>
          <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700" onClick={() => setShowTemaModal(true)}>+ Añadir tema</button>
        </div>
        {temas.length === 0 ? (
          <div className="text-gray-500">No hay temas creados.</div>
        ) : (
          temas.map(tema => (
            <div key={tema.id} className="mb-6 border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-lg text-gray-800">{tema.nombre}</h3>
                <button className="text-blue-600 hover:underline" onClick={() => { setTemaSeleccionado(tema.id); setShowTareaModal(true); }}>+ Añadir tarea</button>
              </div>
              {tema.tareas.length === 0 ? (
                <div className="text-gray-400 ml-2">No hay tareas en este tema.</div>
              ) : (
                <div className="grid gap-4 ml-2">
                  {tema.tareas.map(tarea => (
                    <div key={tarea.id} className="relative bg-white rounded-lg shadow p-4 flex flex-col sm:flex-row sm:items-center gap-2">
                      {/* Menú de 3 puntitos */}
                      <div className="absolute top-2 right-2">
                        <MenuTarea tareaId={tarea.id} onDelete={handleDeleteTarea} onEdit={() => setEditTarea(tarea)} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-gray-800 text-base">{tarea.titulo}</span>
                          <span className="text-xs px-2 py-0.5 rounded bg-blue-100 text-blue-700">{tarea.tipo_tarea}</span>
                        </div>
                        <div className="text-gray-600 text-sm mb-1">{tarea.descripcion}</div>
                        <div className="text-xs text-gray-500">Entrega: {tarea.fecha_entrega} {tarea.hora_entrega}</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Modal para añadir tema */}
      {showTemaModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-sm">
            <h2 className="text-lg font-bold mb-4">Añadir nuevo tema</h2>
            <input
              type="text"
              className="w-full p-2 border rounded mb-4"
              placeholder="Nombre del tema"
              value={nuevoTema}
              onChange={e => setNuevoTema(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button className="px-4 py-2 bg-gray-300 rounded" onClick={() => setShowTemaModal(false)}>Cancelar</button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded" onClick={handleAddTema}>Añadir</button>
            </div>
          </div>
        </div>
      )}

      {/* Modal para añadir tarea */}
      {showTareaModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-transparent">
          <div className="bg-white p-0 rounded-lg shadow-lg w-full max-w-xl">
            <FormularioTarea
              id_tema={temaSeleccionado}
              onSuccess={() => {
                setShowTareaModal(false);
                fetch(`http://localhost:5000/api/curso/${id}/temas`).then(r => r.json()).then(data => setTemas(data.temas || []));
                setModal({ isOpen: true, message: 'Tarea creada exitosamente', type: 'success' });
              }}
              onCancel={() => setShowTareaModal(false)}
              modo="modal"
            />
          </div>
        </div>
      )}

      {/* Modal para editar tarea */}
      {editTarea && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-30">
          <div className="bg-white p-0 rounded-lg shadow-lg w-full max-w-xl">
            <FormularioTarea
              initialData={editTarea}
              onSuccess={() => {
                setEditTarea(null);
                fetch(`http://localhost:5000/api/curso/${id}/temas`).then(r => r.json()).then(data => setTemas(data.temas || []));
                setModal({ isOpen: true, message: 'Tarea editada exitosamente', type: 'success' });
              }}
              onCancel={() => setEditTarea(null)}
              modo="modal"
            />
          </div>
        </div>
      )}

      {/* Modal de éxito/error */}
      <Modal isOpen={modal.isOpen} message={modal.message} type={modal.type} onClose={() => setModal({ ...modal, isOpen: false })} />
    </div>
  );
}

// Componente de menú de 3 puntitos para cada tarea
function MenuTarea({ tareaId, onDelete, onEdit }) {
  const [open, setOpen] = React.useState(false);
  const [confirm, setConfirm] = React.useState(false);
  return (
    <div className="relative">
      <button
        className="p-1 rounded-full hover:bg-gray-200 focus:outline-none"
        onClick={() => setOpen(o => !o)}
        aria-label="Opciones de tarea"
      >
        <svg width="20" height="20" fill="currentColor" className="text-gray-500" viewBox="0 0 20 20">
          <circle cx="4" cy="10" r="2" />
          <circle cx="10" cy="10" r="2" />
          <circle cx="16" cy="10" r="2" />
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-20">
          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100" onClick={() => { setOpen(false); onEdit(); }}>Editar</button>
          <button className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 text-red-600" onClick={() => setConfirm(true)}>Eliminar</button>
        </div>
      )}
      {confirm && (
        <div className="absolute right-0 mt-10 w-48 bg-white border rounded shadow-lg z-30 p-4">
          <div className="text-sm mb-2">¿Seguro que deseas eliminar esta tarea?</div>
          <div className="flex gap-2 justify-end">
            <button className="px-2 py-1 text-gray-600 hover:underline" onClick={() => setConfirm(false)}>Cancelar</button>
            <button className="px-2 py-1 text-red-600 hover:underline" onClick={() => { setConfirm(false); setOpen(false); onDelete(tareaId); }}>Eliminar</button>
          </div>
        </div>
      )}
    </div>
  );
} 