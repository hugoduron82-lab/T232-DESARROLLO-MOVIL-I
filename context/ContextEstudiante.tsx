import { createContext } from "react";
import { Estudiante } from "../modelos/Estudiante";

export const contextEstudiante = createContext({
    listaEstudiantes: [] as Estudiante [],
    agregarEstudiante: (estudiante: Estudiante) => {}
});