import { useState } from 'react';
import { useSnackbar } from 'notistack';

import { Box, Radio, Paper, Button, Typography, RadioGroup, FormControlLabel } from '@mui/material';

export default function EncuestaStepper({
  preguntasPorAspecto,
  onSubmit,
}: {
  preguntasPorAspecto: Record<string, any[]>;
  onSubmit: (respuestas: Record<number, number>) => void;
}) {
  const { enqueueSnackbar } = useSnackbar();
  const aspectos = Object.keys(preguntasPorAspecto);
  const [currentStep, setCurrentStep] = useState(0);
  const [respuestas, setRespuestas] = useState<Record<number, number>>({});

  const handleChange = (preguntaId: number, respuestaId: number) => {
    setRespuestas((prev) => ({
      ...prev,
      [preguntaId]: respuestaId,
    }));
  };

  const preguntas = preguntasPorAspecto[aspectos[currentStep]];

  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Categoría: {aspectos[currentStep]}
      </Typography>
      <Typography variant="body2" sx={{ mb: 2, color: 'text.secondary' }}>
        Contesta las siguientes preguntas de forma honesta. Tus respuestas son anónimas.
      </Typography>

      {preguntas.map((preg: any) => (
        <Paper
          key={preg.id}
          elevation={3}
          sx={{
            p: 3,
            mb: 3,
            borderRadius: 2,
            backgroundColor: '#ffffff',
            boxShadow: '0 3px 8px rgba(0, 0, 0, 0.06)',
            border: '1px solid #e0e0e0',
          }}
        >
          <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 1 }}>
            {preg.texto}
          </Typography>

          <RadioGroup
            value={respuestas[preg.id] || ''}
            onChange={(e) => handleChange(preg.id, parseInt(e.target.value))}
          >
            {preg.respuestas.map((resp: any) => (
              <FormControlLabel
                key={resp.id}
                value={resp.id}
                control={<Radio />}
                label={resp.texto}
                sx={{
                  mx: 0,
                  my: 0.5,
                  borderRadius: 1,
                  px: 1,
                  '& .MuiFormControlLabel-label': {
                    fontSize: '0.95rem',
                  },
                }}
              />
            ))}
          </RadioGroup>
        </Paper>
      ))}

      <Box display="flex" justifyContent="space-between" mt={3}>
        <Button
          variant="outlined"
          disabled={currentStep === 0}
          onClick={() => setCurrentStep((prev) => prev - 1)}
        >
          Anterior
        </Button>

        {currentStep === aspectos.length - 1 ? (
          <Button
            variant="contained"
            size="large"
            sx={{ backgroundColor: '#1976d2', color: '#fff', px: 4, py: 1.5 }}
            onClick={() => {
              const preguntasPaso = preguntasPorAspecto[aspectos[currentStep]];
              const todasRespondidas = preguntasPaso.every((p: any) => respuestas[p.id]);

              if (!todasRespondidas) {
                enqueueSnackbar('Responde todas las preguntas antes de enviar.', {
                  variant: 'warning',
                });
                return;
              }

              onSubmit(respuestas);
            }}
          >
            Enviar respuestas
          </Button>
        ) : (
          <Button
            variant="contained"
            onClick={() => {
              const preguntasPaso = preguntasPorAspecto[aspectos[currentStep]];
              const todasRespondidas = preguntasPaso.every((p: any) => respuestas[p.id]);

              if (!todasRespondidas) {
                enqueueSnackbar('Responde todas las preguntas antes de continuar.', {
                  variant: 'warning',
                });
                return;
              }

              setCurrentStep((prev) => prev + 1);
            }}
          >
            Siguiente
          </Button>
        )}
      </Box>
    </Box>
  );
}
