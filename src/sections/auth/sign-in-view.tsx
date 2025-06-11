import {useSnackbar} from "notistack";
import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';

import { loginUsuario } from '../../api/auth';
import { useAuth } from '../../contexts/AuthContext';

// ----------------------------------------------------------------------

export function SignInView() {
  const { enqueueSnackbar } = useSnackbar();
  const auth = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);

  const handleSignIn = useCallback(() => {
    router.push('/');
  }, [router]);

  const handleLogin = async () => {
    try {
      const responseLogin = await loginUsuario({ username: email, password });
      auth.login(responseLogin.user, responseLogin.token);
        localStorage.setItem('refreshToken', responseLogin.refreshToken);
      router.push('/');
    } catch (error: any) {
      console.error('Error al iniciar sesión', error);

      const message = error.response?.data?.message || 'Error inesperado al iniciar sesión';

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
        name="email"
        label="Correo electronico"
        defaultValue="ejemplo@mulege.tecnm.mx"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        sx={{ mb: 3 }}
        slotProps={{
          inputLabel: { shrink: true },
        }}
      />

      <TextField
        fullWidth
        name="password"
        label="Password"
        defaultValue="@demo1234"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        type={showPassword ? 'text' : 'password'}
        slotProps={{
          inputLabel: { shrink: true },
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
        sx={{ mb: 3 }}
      />

      <Button
        fullWidth
        size="large"
        type="submit"
        color="inherit"
        variant="contained"
        onClick={handleLogin}
      >
        Entrar
      </Button>

        <Box sx={{ width: '100%', mt: 4 }}>
            <Box
                sx={{
                    borderTop: '1px solid',
                    borderColor: 'divider',
                    my: 3,
                    width: '100%',
                }}
            />
            <Typography variant="subtitle2" align="center" gutterBottom>
                ¿Eres estudiante?
            </Typography>

            <Button
                fullWidth
                size="large"
                variant="outlined"
                color="primary"
                onClick={() => router.push('/encuesta-code')}
                sx={{
                    mt: 1,
                    fontWeight: 'bold',
                    textTransform: 'none',
                    borderWidth: 2,
                    ':hover': {
                        borderWidth: 2,
                    },
                }}
            >
                Ir a contestar la encuesta
            </Button>
        </Box>
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
        <Typography variant="h5">Iniciar sesion</Typography>
      </Box>
      {renderForm}
    </>
  );
}
