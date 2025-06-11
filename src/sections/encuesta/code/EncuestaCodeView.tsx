import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import CardContent from '@mui/material/CardContent';

import { getInfoAlumnoByNumControl } from '../../../api/alumnos';
import { getFormularioByGrupoClave } from '../../../api/formularios';

import type { AlumnoInformationResponse, MateriasFromAlumnoResponse } from '../../../api/alumnos';

// ----------------------------------------------------------------------

export function EncuestaCodeView() {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();

    const [numControl, setNumControl] = useState('');
    const [codeGrupo, setCodeGrupo] = useState('');
    const [isAlumnoEncontrado, setIsAlumnoEncontrado] = useState(false);
    const [yaContestoTodo, setYaContestoTodo] = useState(false);
    const [informationAlumno, setInformationAlumno] = useState<AlumnoInformationResponse | null>(null);
    const [selectedGrupo, setSelectedGrupo] = useState('');

    const handleSendNumControl = async () => {
        try {
            const alumnoResponse = await getInfoAlumnoByNumControl(numControl);
            if (alumnoResponse.success) {
                const materiasPendientes = alumnoResponse.data?.materias || [];
                setIsAlumnoEncontrado(true);
                setInformationAlumno(alumnoResponse.data);
                setYaContestoTodo(materiasPendientes.length === 0);
            }
        } catch (error: any) {
            console.error('Error al obtener la información del alumno', error);
            const message =
                error.response?.data?.message || 'Error inesperado al obtener la información del alumno';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    const handleSendCode = async () => {
        if (!selectedGrupo) {
            enqueueSnackbar('Selecciona una materia para continuar.', { variant: 'warning' });
            return;
        }

        try {
            const responseFormulario = await getFormularioByGrupoClave(selectedGrupo);
            navigate('/encuesta', {
                state: {
                    formulario: responseFormulario.data,
                    alumnoNumControl: numControl,
                },
            });
        } catch (error: any) {
            console.error('Error al obtener el formulario', error);
            const message = error.response?.data?.message || 'Error inesperado al obtener el formulario';
            enqueueSnackbar(message, { variant: 'error' });
        }
    };

    const handleLogoutAlumno = () => {
        setIsAlumnoEncontrado(false);
        setInformationAlumno(null);
        setSelectedGrupo('');
        setNumControl('');
        setYaContestoTodo(false);
    };

    const renderForm = (
        <Box
            sx={{
                display: 'flex',
                alignItems: 'flex-end',
                flexDirection: 'column',
            }}
        >
            <TextField
                fullWidth
                name="numControl"
                label="Número de control"
                placeholder="Ejemplo: 201061034"
                value={numControl}
                onChange={(e) => setNumControl(e.target.value)}
                sx={{ mb: 3 }}
            />

            <Button
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                onClick={handleSendNumControl}
            >
                Acceder
            </Button>
        </Box>
    );

    const renderMateriasSelect = (
        <>
            <FormControl fullWidth sx={{ mb: 3 }}>
                <InputLabel id="materia-select-label">Materia</InputLabel>
                <Select
                    labelId="materia-select-label"
                    value={selectedGrupo}
                    label="Materia"
                    onChange={(e) => setSelectedGrupo(e.target.value)}
                >
                    {informationAlumno?.materias?.map((materia: MateriasFromAlumnoResponse) => (
                        <MenuItem key={materia.claveGrupo} value={materia.claveGrupo}>
                            {materia.nombreMateria} ({materia.claveGrupo})
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>

            <Button fullWidth size="large" color="primary" variant="contained" onClick={handleSendCode}>
                Comenzar Evaluación
            </Button>

            <Button
                fullWidth
                size="large"
                color="secondary"
                variant="outlined"
                sx={{ mt: 2 }}
                onClick={handleLogoutAlumno}
            >
                No soy {informationAlumno?.nombre} - Salir
            </Button>
        </>
    );

    const renderMensajeFinalizado = (
        <Card elevation={4} sx={{ p: 3, backgroundColor: '#f3f4f6' }}>
            <CardContent>
                <Typography variant="h4" align="center" gutterBottom>
                    🎉 ¡Gracias, {informationAlumno?.nombre}!
                </Typography>
                <Typography variant="body1" align="center" sx={{ mb: 3 }}>
                    Ya has completado todas tus evaluaciones docentes. Agradecemos tu participación.
                </Typography>
                <Button
                    fullWidth
                    size="large"
                    color="secondary"
                    variant="outlined"
                    onClick={handleLogoutAlumno}
                >
                    Salir
                </Button>
            </CardContent>
        </Card>
    );

    return (
        <>
            <Box
                sx={{
                    gap: 1.5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 5,
                }}
            >
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                    {isAlumnoEncontrado
                        ? `Hola ${informationAlumno?.nombre}`
                        : 'Ingresa tu número de control'}
                </Typography>

                {isAlumnoEncontrado && !yaContestoTodo && (
                    <Typography variant="h5" sx={{ textAlign: 'center' }}>
                        Selecciona la materia que deseas evaluar
                    </Typography>
                )}
            </Box>

            {!isAlumnoEncontrado && renderForm}
            {isAlumnoEncontrado && (yaContestoTodo ? renderMensajeFinalizado : renderMateriasSelect)}
        </>
    );
}
