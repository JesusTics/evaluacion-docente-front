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


export interface MateriaDocenteDTOResponse {
    materiaId: number;
    nombreMateria: string;
    materiaInscritos: number;
    materiaClave: string;
    docenteNombre: string;
}


export interface FormularioMateriaResponse {
    success: boolean;
    data: FormularioCompletoDTOResponse;
    message: MateriaDocenteDTOResponse
}

export interface FormularioCompletoDTOResponse {
    id: number;
    nombre: string;
    aspectos: AspectoEvaluadoDTOResponse[];
    docenteInformationDTO: DocenteInformationDTOResponse;
    materiaAndGrupoInformationDTO: MateriaAndGrupoInformationDTOResponse;
}

export interface AspectoEvaluadoDTOResponse {
    id: number;
    nombre: string;
    preguntas: PreguntaDTOResponse[];
}

export interface PreguntaDTOResponse {
    id: number;
    texto: string;
    opciones: OpcionRespuestaDTOResponse[];
}

export interface OpcionRespuestaDTOResponse {
    id: number;
    valor: number;
    descripcion: string;
}

export interface DocenteInformationDTOResponse {
    nombreDocente: string;
    imgDocente: string;
}

export interface MateriaAndGrupoInformationDTOResponse {
    nombreMateria: string;
    claveMateria: string;
    nombreGrupo: string;
    claveGrupo: string;
    grupoId: number;
}

export const getFormularioByGrupoClave = async (
    grupoClave: string
): Promise<FormularioMateriaResponse> => {
    // const response = await axiosInstance.get<FormularioMateriaResponse>('/formulario/por-docente/' + materiaClave);
    const response = await axiosInstance.get<FormularioMateriaResponse>(`/formulario/por-grupo?claveGrupo=${grupoClave}`);
    console.log('LA RESPONSE AL OBTENER FORMULARIO', response.data);
    return response.data
}

// export interface FormularioRespuestasRequest {
//     preguntaYRespuesta: PreguntaYRespuestaRequest[];
//     materiaClave: string;
// }
//
// export interface PreguntaYRespuestaRequest {
//     preguntaId: number;
//     respuestaId: number;
// }

export interface FormularioRespuestasRequest {
    grupoMateriaDocenteId: number;
    respuestas: PreguntaYRespuestaRequest[];
}

export interface PreguntaYRespuestaRequest {
    preguntaId: number;
    opcionRespuestaId: number;
}

export const postSaveAnswers = async (
    respuestasRequest: FormularioRespuestasRequest
): Promise<any> => {
    const response = await axiosInstance.post('/respuestas', respuestasRequest);
    console.log('RESPUESTA AL GUARDAR FORMULARIO', response.data);
    return response.data;
}