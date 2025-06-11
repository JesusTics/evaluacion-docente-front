import type { Palette } from '@mui/material/styles';

import { varAlpha } from 'minimal-shared/utils';

import { useTheme } from '@mui/material/styles';
import { Box, Card, Typography } from '@mui/material';


type PaletteKey = keyof Pick<
    Palette,
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error'
>;

type Props = {
    title: string;
    total: number;
    icon: React.ReactNode;
    color?: PaletteKey; // puede ser 'primary', 'warning', 'success', etc.
};

export function DashboardInfoCard({ title, total, icon, color = 'primary' }: Props) {
    const theme = useTheme()

    const bgColor = theme.vars.palette[color]?.lighter || theme.palette.grey[100];
    const textColor = theme.vars.palette[color]?.darker || theme.palette.text.primary;

    return (
        <Card
            sx={{
                py: 4,
                px: 3,
                textAlign: 'center',
                backgroundColor: bgColor,
                color: textColor,
                borderRadius: 3,
                boxShadow: `0 6px 12px ${varAlpha(theme.vars.palette[color]?.mainChannel || '0,0,0', 0.12)}`,
            }}
        >
            <Box sx={{ mb: 2, fontSize: 48 }}>{icon}</Box>

            <Typography variant="subtitle2" sx={{ opacity: 0.72, mb: 0.5 }}>
                {title}
            </Typography>

            <Typography variant="h4">{total}</Typography>
        </Card>
    );
}
