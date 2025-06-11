import { axiosInstance } from './axios';

export interface DashboardDocenteResponse {
  totalMaterias: number;
  totalEncuestasContestadas: number;
  promedioGeneralDocente: number;
  materiaYPromedioResponses: MateriaYPromedioResponse[];
  message: string;
  success: boolean;
}

export interface MateriaYPromedioResponse {
  grupoId: number;
  grupoNombre: string;
  materiaId: number;
  materiaNombre: string;
  promedio: number;
}

export const getAllInformactionDashboardByDocente = async (
  idDocente: number
): Promise<DashboardDocenteResponse> => {
  const response = await axiosInstance.get<DashboardDocenteResponse>(
    '/dashboard/informationByDocente/' + idDocente
  );
  console.log('ERROR AL OBTENER LA INFORMACION DEL DASHBOARD BY DOCENTE', response.data);
  return response.data;
};

export const generateEvaluacionAlumnosByDocente = async (
    idDocente: number
): Promise<Blob> => {
  const response = await axiosInstance.get('/reporte/evaluacion-alumnos/' + idDocente, {
    responseType: 'blob',
  });

  return response.data as Blob;
};
