import { useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { useRouter } from 'src/routes/hooks';

import { getFormularioByGrupoClave } from '../../../api/formularios';

// ----------------------------------------------------------------------

export function EncuestaCodeView() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const [numDocente, setNumDocente] = useState(0);
  const [code, setCode] = useState('');
  const router = useRouter();

  const handleSendCode = async () => {
    try {
      const responseFormulario = await getFormularioByGrupoClave(code);
      // router.push('/');
      console.log('responseFormulario', responseFormulario);
      console.log('responseFormulario', responseFormulario.data);
      navigate('/encuesta', {
        state: {
          formulario: responseFormulario.data,
        },
      });
    } catch (error: any) {
      console.error('Error al obtener el formulario', error);

      const message = error.response?.data?.message || 'Error inesperado al obtener el formulario';

      enqueueSnackbar(message, { variant: 'error' });
    }
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
        name="code"
        label="Codigo del Formulario"
        defaultValue="123AHRSA"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleSendCode}
      >
        Acceder
      </Button>
    </Box>
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
        <Typography variant="h5" sx={{ alignContent: 'center', textAlign: 'center' }}>
          Ingresa el codigo
        </Typography>
      </Box>
      {renderForm}
    </>
  );
}
