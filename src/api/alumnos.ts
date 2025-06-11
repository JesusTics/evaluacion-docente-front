import {axiosInstance} from "./axios";

export interface AlumnoResponse {
    success: boolean;
    data: AlumnoInformationResponse;
    message: string;
}

export interface AlumnoInformationResponse {
    numeroControl: string;
    nombre: string;
    materias: MateriasFromAlumnoResponse[];
}

export interface MateriasFromAlumnoResponse {
    claveGrupo: string;
    nombreMateria: string;
    contestado: boolean;
}



export const getInfoAlumnoByNumControl = async (
    numControl: string
): Promise<AlumnoResponse> => {
    const response = await axiosInstance.get<AlumnoResponse>(`/alumno/${numControl}`);
    console.log('LA RESPONSE AL OBTENER FORMULARIO', response.data);
    return response.data
}

