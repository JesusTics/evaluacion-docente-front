  import { useSnackbar } from 'notistack';
  import { useState, useEffect } from 'react';
  import { useLocation, useNavigate } from 'react-router-dom';

  import { CircularProgress } from '@mui/material';

  import { postSaveAnswers } from '../api/formularios';
  import EncuestaLayout from '../layouts/encuesta/layout';
  import EncuestaStepper from '../layouts/components/EncuestaStepper';

  import type { FormularioMateriaResponse } from '../api/formularios';

  export default function Encuesta() {
    const { enqueueSnackbar } = useSnackbar();
    const { state } = useLocation();
    const navigate = useNavigate();
    const [formulario, setFormulario] = useState<any>(null);
    const [materiaDocenteDTO, setMateriaDocenteDTO] = useState<FormularioMateriaResponse>();
    const [preguntasPorAspecto, setPreguntasPorAspecto] = useState<any>({});

    useEffect(() => {
      if (!state?.formulario) {
        navigate('/ingresar-clave'); // si no viene data, regresar
        return;
      }

      if (!state?.materiaDocenteDTO) {
        navigate('/ingresar-clave'); // si no viene data, regresar
        return;
      }
      const agrupado = groupBy(state.formulario.preguntas, 'aspectoEvaluado');
      setPreguntasPorAspecto(agrupado);
      setFormulario(state.formulario);
      setMateriaDocenteDTO(state.materiaDocenteDTO);
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

    if (!formulario) {
      return <CircularProgress />;
    }

    return (
      <EncuestaLayout
        materiaInfo={{
          nombreMateria: state.formulario.nombre,
          nombreDocente: state.materiaDocenteDTO.docenteNombre,
          claveGrupo: state.code || '---',
        }}
      >
        <EncuestaStepper
            preguntasPorAspecto={preguntasPorAspecto}
            onSubmit={async (respuestasAlumno) => {
              console.log('Respuestas seleccionadas:', respuestasAlumno);

              // Paso 1: transformar a lista de objetos
              const mapped = Object.entries(respuestasAlumno).map(([preguntaId, respuestaId]) => ({
                preguntaId: Number(preguntaId),
                respuestaId: respuestaId,
              }));

              // Paso 2: construir el payload completo
              const payload = {
                preguntaYRespuesta: mapped,
                materiaClave: state.materiaDocenteDTO.materiaClave,
              };

              console.log('El payload:', payload);

              try {
                const response = await postSaveAnswers(payload);
                enqueueSnackbar(response.message, {
                  variant: response.success ? 'success' : 'error',
                });

                // (Opcional) redirigir a una pantalla de "Gracias"
                if (response.success) {
                  navigate('/gracias');
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
