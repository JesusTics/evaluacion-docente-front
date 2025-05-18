import {axiosInstance} from "./axios";

export interface RespuestaDTOResponse {
    id: number;
    texto: string;
    valor: number;
}

export interface PreguntaDTOResponse {
    id: number;
    texto: string;
    aspectoEvaluado: string;
    respuestas: RespuestaDTOResponse[];
}
export interface FormularioCompletoDTOResponse {
    id: number;
    nombre: string;
    esGenerico: boolean;
    preguntas: PreguntaDTOResponse[];
}

export interface MateriaDocenteDTOResponse {
    materiaId: number;
    nombreMateria: string;
    materiaInscritos: number;
    materiaClave: string;
    docenteNombre: string;
}

export interface FormularioMateriaResponse {
    success: boolean;
    formulario: FormularioCompletoDTOResponse;
    materiaDocenteDTO: MateriaDocenteDTOResponse
}

export const getFormularioByClaveMateria = async (
    materiaClave: string
): Promise<FormularioMateriaResponse> => {
    const response = await axiosInstance.get<FormularioMateriaResponse>('/formulario/byMateria/' + materiaClave);
    console.log('LA RESPONSE AL OBTENER FORMULARIO', response.data);
    return response.data
}