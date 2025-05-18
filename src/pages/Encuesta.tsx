import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { Box, CircularProgress } from '@mui/material';

import EncuestaLayout from "../layouts/encuesta/layout";
import {FormularioMateriaResponse} from "../api/formularios";
import EncuestaStepper from "../layouts/components/EncuestaStepper";

export default function Encuesta() {
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

    if (!formulario) {
        return <CircularProgress />;
    }

    return (
        <EncuestaLayout materiaInfo={{
            nombreMateria: state.formulario.nombre,
            nombreDocente: state.materiaDocenteDTO.docenteNombre,
            claveGrupo: state.code || '---',
        }}>
            <EncuestaStepper
                preguntasPorAspecto={preguntasPorAspecto}
                onSubmit={(respuestasAlumno) => {
                    console.log('Respuestas seleccionadas:', respuestasAlumno);
                    // Aquí llamas a tu endpoint de guardar
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
