import { useState } from 'react';

import { Box, Radio, Paper, Button, Typography, RadioGroup, FormControlLabel } from '@mui/material';

export default function EncuestaStepper({
  preguntasPorAspecto,
  onSubmit,
}: {
  preguntasPorAspecto: Record<string, any[]>;
  onSubmit: (respuestas: Record<number, number>) => void;
}) {
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

      {preguntas.map((preg: any) => (
        <Paper key={preg.id} sx={{ p: 2, mb: 2 }}>
          <Typography>{preg.texto}</Typography>
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
          <Button variant="contained" onClick={() => onSubmit(respuestas)}>
            Enviar respuestas
          </Button>
        ) : (
          <Button variant="contained" onClick={() => setCurrentStep((prev) => prev + 1)}>
            Siguiente
          </Button>
        )}
      </Box>
    </Box>
  );
}
