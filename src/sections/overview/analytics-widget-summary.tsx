import type { CardProps } from '@mui/material/Card';
import type { PaletteColorKey } from 'src/theme/core';
import type { ChartOptions } from 'src/components/chart';

import { varAlpha } from 'minimal-shared/utils';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import { useTheme } from '@mui/material/styles';

import { fNumber, fPercent, fShortenNumber } from 'src/utils/format-number';

import { Iconify } from 'src/components/iconify';
import { SvgColor } from 'src/components/svg-color';
import { Chart, useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title: string;
  total: number;
  percent: number;
  color?: PaletteColorKey;
  icon: React.ReactNode;
  chart: {
    series: number[];
    categories: string[];
    options?: ChartOptions;
  };
};

export function AnalyticsWidgetSummary({
                                           sx,
                                           icon,
                                           title,
                                           total,
                                           color = 'primary',
                                           ...other
                                       }: Props) {
    const theme = useTheme();

    return (
        <Card
            sx={[
                {
                    p: 3,
                    boxShadow: 'none',
                    color: `${color}.darker`,
                    backgroundColor: 'common.white',
                    backgroundImage: `linear-gradient(135deg, ${varAlpha(
                        theme.vars.palette[color].lighterChannel,
                        0.48
                    )}, ${varAlpha(theme.vars.palette[color].lightChannel, 0.48)})`,
                },
                ...(Array.isArray(sx) ? sx : [sx]),
            ]}
            {...other}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ width: 48, height: 48 }}>{icon}</Box>

                <Box>
                    <Box sx={{ mb: 0.5, typography: 'subtitle2' }}>{title}</Box>
                    <Box sx={{ typography: 'h4' }}>{fShortenNumber(total)}</Box>
                </Box>
            </Box>
        </Card>
    );
}

