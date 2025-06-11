import { useState, useEffect } from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import { DashboardContent } from 'src/layouts/dashboard';

import { Iconify } from '../../../components/iconify';
import { useAuth } from '../../../contexts/AuthContext';
import { AnalyticsWebsiteVisits } from '../analytics-website-visits';
import { getAllInformactionDashboardByDocente } from '../../../api/dashboard';
import { DashboardInfoCard } from '../../../components/cards/DashboardInfoCard';

import type { DashboardDocenteResponse } from '../../../api/dashboard';

// ----------------------------------------------------------------------

export function OverviewAnalyticsView() {
  const auth = useAuth();
  const user = auth.user;
  const [dashboardData, setDashboardData] = useState<DashboardDocenteResponse | null>(null);

  const handleGetDahsboardInfoByDocente = async () => {
    if (user?.id) {
      try {
        const responseDashboard = await getAllInformactionDashboardByDocente(user.id);
        console.log('LA RESPONSE DEL DASHBOARD', responseDashboard);
        setDashboardData(responseDashboard);
      } catch (error: any) {
        console.error('Error al obtener la informacion del dashboard by docente', error);
        const message =
          error.response?.data?.message ||
          'Error inesperado al obtener la informacion del dashboard';
        // enqueueSnackbar(message, { variant: 'error' });
      }
    }
  };

  useEffect(() => {
    console.log('EL USUARIO, DENTRO DEL USEEFFECT', user);
    if (user) {
      handleGetDahsboardInfoByDocente();
    }
  }, [user]);

  const generateColorFromString = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + hash * 31;
    }
    const hue = Math.abs(hash) % 360;
    return `hsl(${hue}, 70%, 50%)`;
  };

  const generateColors = (names: string[]): string[] =>
    names.map((name) => generateColorFromString(name));

  return (
    <DashboardContent maxWidth="xl">
      <Typography variant="h4" sx={{ mb: { xs: 3, md: 5 } }}>
        Hola bienvenido {user?.nombre ?? ''} 👋
      </Typography>

      <Grid container spacing={3}>
        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardInfoCard
            title="Grupos asignados"
            total={dashboardData?.totalMaterias ?? 0}
            color="info"
            icon={
              <Iconify
                icon={'solar:book-2-bold-duotone' as any}
                width={64}
                height={64}
                sx={{ color: 'inherit' }}
              />
            }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardInfoCard
              title="Promedio docente"
              total={dashboardData?.promedioGeneralDocente ?? 0}
              color="success"
              icon={
                <Iconify
                    icon={'solar:chart-2-bold-duotone' as any}
                    width={64}
                    height={64}
                    sx={{ color: 'inherit' }}
                />
              }
          />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 }}>
          <DashboardInfoCard
              title="Encuestas contestadas"
              total={dashboardData?.totalEncuestasContestadas ?? 0}
              color="warning"
              icon={
                <Iconify
                    icon={'solar:checklist-bold-duotone' as any}
                    width={64}
                    height={64}
                    sx={{ color: 'inherit' }}
                />
              }
          />
        </Grid>

        {dashboardData && (
          <Grid size={{ xs: 12, md: 12, lg: 12 }}>
            {dashboardData?.materiaYPromedioResponses.length > 0 && (
              <AnalyticsWebsiteVisits
                title="Promedio por Materia"
                subheader="Visualización de evaluación docente"
                chart={{
                  categories: dashboardData.materiaYPromedioResponses.map((m) => m.materiaNombre),
                  colors: generateColors(
                    dashboardData.materiaYPromedioResponses.map((m) => m.materiaNombre)
                  ),
                  series: [
                    {
                      name: 'Promedio',
                      data: dashboardData.materiaYPromedioResponses.map((m) =>
                        parseFloat(m.promedio.toFixed(2))
                      ),
                    },
                  ],
                }}
              />
            )}
          </Grid>
        )}
      </Grid>
    </DashboardContent>
  );
}
