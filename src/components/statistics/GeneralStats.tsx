import { TrendingDown, TrendingUp } from '@mui/icons-material';
import { Grid2, Card, CardContent, Stack, Typography, Chip, Box, ToggleButtonGroup, ToggleButton } from '@mui/material'
import { useState } from 'react'

const genStats = [
    {
        title: 'Total users',
        value: 20,
        extra: 2,
        statistics: 1,
    },
    {
        title: 'Number of sessions',
        value: 15,
        extra: 2,
        statistics: 1,

    },
    {
        title: 'Number of tickets purchased',
        value: 100,
        extra: 2,
        statistics: 1,
    },
    {
        title: 'Percentage of halls occupied',
        value: '75 %',
        extra: 2,
        statistics: 1,
    },
]

const getColor = (percentage: number): 'primary' | 'error' | 'warning' => {
    return percentage > 10 ? 'primary' : percentage < -10 ? 'error' : 'warning';
}

const periods = ['year', 'month', 'day'];

const GeneralStats = () => {
    const [period, setPeriod] = useState(1);
    return (
        <>
            <Grid2 size={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">General Statistics</Typography>
                    <ToggleButtonGroup
                        color="primary"
                        value={period}
                        exclusive
                        onChange={(e, value) => { if (value !== null) setPeriod(value) }}
                        aria-label="Platform"
                        sx={{ marginTop: "5px", marginBottom: "5px" }}
                    >
                        {periods.map((item, index) =>
                            <ToggleButton value={index} size='small'>
                                {item}
                            </ToggleButton>
                        )}
                    </ToggleButtonGroup>
                </Box>
            </Grid2>
            {genStats.map(item =>
                <Grid2 size={{ xs: 6, md: 3 }}>
                    <Card sx={{ width: '100%', heigth: '100%' }}>
                        <CardContent>
                            <Stack spacing={0.5}>
                                <Typography variant="subtitle1" color="textSecondary" textAlign='left'>
                                    {item.title}
                                </Typography>
                                <Stack direction='row' alignItems='center'>
                                    <Typography variant="h5" color="inherit">
                                        {item.value}
                                    </Typography>
                                    <Chip
                                        color={getColor(item.statistics)}
                                        icon={
                                            <>
                                                {item.statistics >= 0 ?
                                                    <TrendingUp style={{ fontSize: '0.75rem', color: 'inherit' }} />
                                                    :
                                                    <TrendingDown style={{ fontSize: '0.75rem', color: 'inherit' }} />
                                                }
                                            </>
                                        }
                                        label={`${item.statistics}%`}
                                        sx={{ ml: 1.25, pl: 1 }}
                                        size="small"
                                    />
                                </Stack>
                            </Stack>

                            <Typography variant="caption" color="secondary" textAlign='left'>
                                Extra {' '}
                                <Typography component="span" variant="caption" sx={{ color: `${getColor(item.statistics) || 'primary'}.main` }}>
                                    {item.extra}
                                </Typography>{' '}
                                {`This ${periods[period]}`}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid2>
            )}
        </>
    )
}

export default GeneralStats