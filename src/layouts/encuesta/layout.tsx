import { Box, Typography, Divider } from '@mui/material';

export default function EncuestaLayout({
  children,
  materiaInfo,
}: {
  children: React.ReactNode;
  materiaInfo: any;
}) {
  return (
    <Box sx={{ px: 4, py: 2 }}>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5">{materiaInfo?.nombreMateria || 'Materia desconocida'}</Typography>
        <Typography variant="subtitle1">
          Docente: {materiaInfo?.nombreDocente || 'Desconocido'}
        </Typography>
        <Typography variant="subtitle2">Grupo: {materiaInfo?.claveGrupo || '---'}</Typography>
      </Box>
      <Divider sx={{ mb: 3 }} />
      {children}
    </Box>
  );
}
