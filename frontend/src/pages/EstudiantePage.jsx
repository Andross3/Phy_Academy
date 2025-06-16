import React, { useState } from "react";
import { PiStudentFill } from "react-icons/pi";
import { FaUserCircle, FaArrowRight } from "react-icons/fa";
import EstudianteTrabajo from "../components/estudianteTrabajo";

export default function EstudiantePage() {

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
        },]

    const tareasSimuladas = [
        { titulo: "Proyecto de React", calificado: true, puntaje: 9 },
        { titulo: "Ejercicio de CSS", calificado: false },
        { titulo: "Algoritmos en JavaScript", calificado: true, puntaje: 8 },
        { titulo: "Optimización de Código", calificado: false }
    ];

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

    return (
        <div className="flex flex-col w-full p-4">
            <div className="flex items-center space-x-2 mt-2 pl-6">
                <PiStudentFill size={25} className="text-gray-200" />
                <p className="text-xl font-bold text-white text-left">Pagina de Estudiante</p></div>
            <div className="flex items-center space-x-2 m-2 mt-4 pl-30">
                <FaUserCircle size={50} className="text-gray-200" />
                <p className="text-5xl font-semibold italic text-white"> Hola Lina </p>
            </div>
            <div className="flex items-center space-x-2 mt-2 pl-4">
                <p className="text-2xl  font-semibold text-white">Cursos Inscritos</p>
                <FaArrowRight size={20} className="text-gray-200" />
            </div>
            <div className="grid grid-cols-[2fr_1fr] gap-4 mt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pl-10">
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
                <div className="col-span-1 rounded-lg p-4 shadow-lg border border-gray-300 bg-gray-900 h-[490]">
                    <EstudianteTrabajo tareas={tareasSimuladas}></EstudianteTrabajo>
                </div>
            </div>
        </div>
    );
};

