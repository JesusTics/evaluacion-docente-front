import { Box, Typography, Divider, Avatar } from '@mui/material';

export default function EncuestaLayout({
                                           children,
                                           materiaInfo,
                                       }: {
    children: React.ReactNode;
    materiaInfo: any;
}) {
    const nombreDocente = materiaInfo?.nombreDocente || 'Desconocido';
    const fotoDocente = materiaInfo?.fotoDocente;

    // Genera avatar random si no hay foto
    const avatarUrl = fotoDocente
        ? fotoDocente
        : `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(nombreDocente)}`;

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #f3f4f6, #e5e7eb)',
                px: 4,
                py: 4,
            }}
        >
            <Box
                sx={{
                    mb: 2,
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}
            >
                {/* Nombre y docente */}
                <Box>
                    <Typography variant="h5">{materiaInfo?.nombreMateria || 'Materia desconocida'}</Typography>
                    <Typography variant="subtitle1">
                        Docente: {nombreDocente}
                    </Typography>
                </Box>

                {/* Avatar */}
                <Avatar
                    src={avatarUrl}
                    alt={nombreDocente}
                    sx={{ width: 64, height: 64 }}
                />
            </Box>

            <Divider sx={{ mb: 3 }} />
            {children}
        </Box>
    );
}
