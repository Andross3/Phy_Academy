import React from "react";
import { Outlet } from "react-router-dom";

export default function Layout() {
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
    return (
        <div className="relative h-screen w-full bg-black overflow-hidden">
            {/* Fondo de estrellas */}
            <div className="fixed top-0 left-0 w-full h-full z-0">
                <Stars />
            </div>

            {/* Contenido visible por encima del fondo */}
            <div className="relative z-10 h-full overflow-y-auto">
                <Outlet />
            </div>
        </div>
    );
}
