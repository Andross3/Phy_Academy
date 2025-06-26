import React, { useState, useRef, useEffect } from 'react';
import TareaRestricciones from '../components/tareaRestricciones';
import TareaPlantilla from '../components/tareaPlantilla';
import Modal from '../components/Modal';

const opciones = [
  {
    value: 'normal',
    label: 'Tarea Regular',
    descripcion: 'Permite desarrollar soluciones de programación sin restricciones',
  },
  {
    value: 'restricciones',
    label: 'Tarea con Restricciones',
    descripcion: 'Define palabras clave para que utilicen en su solución',
  },
  {
    value: 'plantilla',
    label: 'Tarea con Plantilla de Código',
    descripcion: 'Proporciona una estructura de código predefinida',
  },
];

export default function PaginaTareaDocente() {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipoTarea, setTipoTarea] = useState('');
  const [open, setOpen] = useState(false);
  const selectRef = useRef(null);
  const [restricciones, setRestricciones] = useState([]); 
  const [codigo, setCodigo] = useState('');
  const [fechaEntrega, setFechaEntrega] = useState('');
  const [horaEntrega, setHoraEntrega] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modal, setModal] = useState({
    isOpen: false,
    message: '',
    type: 'success'
  });

  useEffect(() => {
    function handleClickOutside(event) {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const selectedOption = opciones.find(opt => opt.value === tipoTarea);

  const imprimirValores = () => {
    console.log("Descripcion:", descripcion);
    console.log("Tipo de Tarea:", tipoTarea);
    console.log("Restricciones seleccionadas:", restricciones);
    // console.log("Código de la plantilla:", codigo);
  };

  const limpiarFormulario = () => {
    setTitulo('');
    setDescripcion('');
    setTipoTarea('');
    setRestricciones([]);
    setCodigo('');
    setFechaEntrega('');
    setHoraEntrega('');
  };

  const mostrarModal = (message, type = 'success') => {
    setModal({
      isOpen: true,
      message,
      type
    });
  };

  const cerrarModal = () => {
    setModal({
      isOpen: false,
      message: '',
      type: 'success'
    });
  };

  const enviarDatos = async () => {
    if (isSubmitting) {
      return;
    }

    if (!titulo.trim()) {
      mostrarModal('Por favor, ingrese un título para la tarea.', 'error');
      return;
    }

    if (!descripcion.trim()) {
      mostrarModal('Por favor, ingrese una descripción para la tarea.', 'error');
      return;
    }

    if (!tipoTarea) {
      mostrarModal('Por favor, seleccione un tipo de tarea.', 'error');
      return;
    }

    if (!fechaEntrega) {
      mostrarModal('Por favor, seleccione una fecha de entrega.', 'error');
      return;
    }

    if (!horaEntrega) {
      mostrarModal('Por favor, seleccione una hora de entrega.', 'error');
      return;
    }

    setIsSubmitting(true);

    const datos = {
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      tipo_tarea: tipoTarea,
      restricciones: tipoTarea === 'restricciones' ? restricciones : [],
      codigo_plantilla: tipoTarea === 'plantilla' ? codigo : '',
      fecha_entrega: fechaEntrega,
      hora_entrega: horaEntrega
    };

    try {
      console.log('Enviando datos:', datos);
      const response = await fetch(`/api/tareas`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(datos)
      });

      console.log('Respuesta recibida:', response.status);

      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Respuesta exitosa:', jsonResponse);
        mostrarModal('La tarea se ha creado exitosamente.');
        limpiarFormulario();
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Error en la respuesta:', errorData);
        mostrarModal(
          errorData.message || 'Error al crear la tarea. Por favor, intente nuevamente.',
          'error'
        );
      }
    } catch (error) {
      console.error('Error completo:', error);
      mostrarModal(
        'Error de conexión. Por favor, verifique que el servidor esté funcionando.',
        'error'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8 p-6 bg-white rounded-lg shadow-md border">
      <h2 className="text-lg font-semibold mb-4">Añadir tarea</h2>
      
      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Título:</label>
        <input
          type="text"
          className="w-full p-2 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={titulo}
          onChange={e => setTitulo(e.target.value)}
          placeholder="Ingrese el título de la tarea"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Descripción:</label>
        <textarea
          className="w-full h-24 p-2 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
          value={descripcion}
          onChange={e => setDescripcion(e.target.value)}
          placeholder="Ingrese la descripción de la tarea"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-gray-700 mb-2">Fecha de entrega:</label>
          <input
            type="date"
            className="w-full p-2 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={fechaEntrega}
            onChange={e => setFechaEntrega(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Hora de entrega:</label>
          <input
            type="time"
            className="w-full p-2 border rounded bg-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-400"
            value={horaEntrega}
            onChange={e => setHoraEntrega(e.target.value)}
          />
        </div>
      </div>

      <div className="mb-4" ref={selectRef}>
        <label className="block text-gray-700 mb-2">Tipo de tarea:</label>
        <div className="relative w-80">
          <button
            type="button"
            className="w-full p-2 border rounded bg-gray-800 text-white flex justify-between items-center"
            onClick={() => setOpen(!open)}
          >
            <span>{selectedOption ? selectedOption.label : '--Seleccionar--'}</span>
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {open && (
            <div className="absolute z-10 mt-2 w-full bg-white border rounded shadow-lg">
              {opciones.map(opt => (
                <div
                  key={opt.value}
                  className={`p-3 cursor-pointer hover:bg-gray-100 ${tipoTarea === opt.value ? 'bg-gray-200' : ''}`}
                  onClick={() => { setTipoTarea(opt.value); setOpen(false); }}
                >
                  <div className="font-medium text-gray-900">{opt.label}</div>
                  <div className="text-gray-500 text-sm">{opt.descripcion}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="mt-8">
        {tipoTarea === 'restricciones' && <TareaRestricciones setRestricciones={setRestricciones}/>}
        {tipoTarea === 'plantilla' && <TareaPlantilla setCodigo={setCodigo} />}
      </div>

      <div className="flex space-x-4 mt-8 justify-end">
        <button 
          className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 disabled:opacity-50"
          onClick={limpiarFormulario}
          disabled={isSubmitting}
        >
          Cancelar
        </button>
        <button
          className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900 disabled:opacity-50"
          disabled={!tipoTarea || isSubmitting}
          onClick={enviarDatos}
        >
          {isSubmitting ? 'Enviando...' : 'Publicar'}
        </button>
      </div>

      <Modal
        isOpen={modal.isOpen}
        message={modal.message}
        type={modal.type}
        onClose={cerrarModal}
      />
    </div>
  );
} 