import { useNavigate } from 'react-router-dom';

import { Box, Button, Container, Typography, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

export default function Gracias() {
    const navigate = useNavigate();

    return (
        <Box
            sx={{
                minHeight: '100vh',
                background: 'linear-gradient(to bottom right, #e0f7fa, #f1f8e9)',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                px: 2,
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    p: 5,
                    maxWidth: 500,
                    textAlign: 'center',
                    borderRadius: 4,
                    backgroundColor: 'white',
                }}
            >
                <CheckCircleOutlineIcon
                    sx={{ fontSize: 60, color: 'green', mb: 2 }}
                />
                <Typography variant="h4" gutterBottom>
                    ¡Gracias por tu participación!
                </Typography>
                <Typography variant="body1" sx={{ mb: 4 }}>
                    Tus respuestas han sido registradas con éxito. 🎉
                </Typography>

                <Button
                    variant="contained"
                    size="large"
                    color="primary"
                    onClick={() => navigate('/encuesta-code')}
                >
                    Volver al inicio
                </Button>
            </Paper>
        </Box>
    );
}
