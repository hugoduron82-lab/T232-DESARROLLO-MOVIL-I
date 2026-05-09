import React, { useState, useEffect, useContext } from "react";
import { Estudiante } from "../modelos/Estudiante";
import { contextEstudiante } from "../context/ContextEstudiante";

export default function EstudianteProvider({ children }: any) {
    // Estado global: lista de estudiantes
    const [listaEstudiantes, setListaEstudiantes] = useState<Estudiante[]>([]);

    // Simulación: después de 5 segundos cargamos 10 estudiantes
    useEffect(() => {
        const temporizador = setTimeout(() => {
            const estudiantesIniciales: Estudiante[] = [
                { id: "1", nombre: "Juan" },
                { id: "2", nombre: "María" },
                { id: "3", nombre: "Carlos" },
                { id: "4", nombre: "Ana" },
                { id: "5", nombre: "Luis" },
                { id: "6", nombre: "Sofía" },
                { id: "7", nombre: "Pedro" },
                { id: "8", nombre: "Lucía" },
                { id: "9", nombre: "Miguel" },
                { id: "10", nombre: "Elena" }
            ];
            setListaEstudiantes(estudiantesIniciales);
        }, 5000);

        // Limpieza del temporizador si el componente se desmonta
        return () => clearTimeout(temporizador);
    }, []);

    // Función para agregar un nuevo estudiante
    function agregarEstudiante(estudiante: Estudiante) {
        setListaEstudiantes([...listaEstudiantes, estudiante]);
    }

    return (
        <contextEstudiante.Provider value={{ listaEstudiantes, agregarEstudiante }}>
            {children}
        </contextEstudiante.Provider>
    );
}

// Hook personalizado para consumir el contexto fácilmente
export const useContextEstudiante = () => {
    return useContext(contextEstudiante);
};