import { useSnackbar } from 'notistack';
import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { CircularProgress } from '@mui/material';

import avatarGenerico from 'src/assets/imagenes/avatarGenerico.png';

import { postSaveAnswers } from '../api/formularios';
import EncuestaLayout from '../layouts/encuesta/layout';
import EncuestaStepper from '../layouts/components/EncuestaStepper';

export default function Encuesta() {
  const { enqueueSnackbar } = useSnackbar();
  const { state } = useLocation();
  const navigate = useNavigate();
  const [buttonEnviarDisabled, setButtonEnviarDisabled] = useState(false);
  const [formulario, setFormulario] = useState<any>(null);
  const [alumnoNumControl, setAlumnoNumControl] = useState<any>(null);
  const [preguntasPorAspecto, setPreguntasPorAspecto] = useState<any>({});

  useEffect(() => {
    if (!state?.formulario) {
      navigate('/ingresar-clave');
      return;
    }
    if (!state?.alumnoNumControl) {
      navigate('/ingresar-clave');
      return;
    }

    // Convertir aspectos a formato plano { [nombreAspecto]: [preguntas] }
    const agrupado = state.formulario.aspectos.reduce((acc: any, aspecto: any) => {
      acc[aspecto.nombre] = aspecto.preguntas.map((p: any) => ({
        ...p,
        aspectoNombre: aspecto.nombre,
      }));
      return acc;
    }, {});

    setPreguntasPorAspecto(agrupado);
    setFormulario(state.formulario);
    setAlumnoNumControl(state.alumnoNumControl);
  }, [state]);

  // const handlePostAnswers = async () => {
  //   try {
  //     const responseSaveAnswers = await postSaveAnswers({});
  //   } catch (error: any) {
  //     console.error('Error al enviar las respuestas', error);
  //
  //     const message = error.response?.data?.message || 'Error inesperado al guardar las respuestas';
  //
  //     enqueueSnackbar(message, { variant: 'error' });
  //   }
  // };

  console.log('EL FORMULARIO INFO', formulario);

  if (!formulario) {
    return <CircularProgress />;
  }

  return (
    <EncuestaLayout
      materiaInfo={{
        nombreMateria: formulario.materiaAndGrupoInformationDTO.nombreMateria,
        nombreDocente: formulario.docenteInformationDTO.nombreDocente,
        claveGrupo: formulario.docenteInformationDTO.nombreGrupo || '---',
        grupoId: formulario.materiaAndGrupoInformationDTO.grupoId || '---',
        fotoDocente: formulario.docenteInformationDTO.imgDocente || avatarGenerico,
      }}
    >
      <EncuestaStepper
        setButtonEnviarDisabled={setButtonEnviarDisabled}
        buttonEnviarDisabled={buttonEnviarDisabled}
        preguntasPorAspecto={preguntasPorAspecto}
        onSubmit={async (respuestasAlumno) => {
          const mapped = Object.entries(respuestasAlumno).map(
            ([preguntaId, opcionRespuestaId]) => ({
              preguntaId: Number(preguntaId),
              opcionRespuestaId: Number(opcionRespuestaId),
            })
          );

          const payload = {
            // grupoMateriaDocenteId: formulario.grupoMateriaDocenteId, // <- asegúrate de pasarlo desde atrás
            grupoMateriaDocenteId: formulario.materiaAndGrupoInformationDTO.grupoId, // <- asegúrate de pasarlo desde atrás
            respuestas: mapped,
            alumnoNumControl,
          };

          try {
            const response = await postSaveAnswers(payload);
            enqueueSnackbar(response.message, {
              variant: response.success ? 'success' : 'error',
            });

            if (response.success) {
              navigate('/gracias', { replace: true });
            }
          } catch (error: any) {
            const message =
              error.response?.data?.message || 'Error inesperado al guardar las respuestas';
            enqueueSnackbar(message, { variant: 'error' });
          }
        }}
      />
    </EncuestaLayout>
  );
}

// Utilidad para agrupar por aspecto
function groupBy(array: any[], key: string) {
  return array.reduce((result: any, current) => {
    const group = current[key];
    if (!result[group]) {
      result[group] = [];
    }
    result[group].push(current);
    return result;
  }, {});
}
