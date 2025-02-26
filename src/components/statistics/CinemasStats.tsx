import { Box, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material'
import { useState } from 'react'
import { LineChart } from "@mui/x-charts/LineChart";

const data = [
    { month: "Jan", "OP": 50000 },
    { month: "Feb", "OP": 55000 },
    { month: "Mar", "OP": 60000, },
    { month: "Apr", "OP": 58000, },
    { month: "May", "OP": 62000, },
    { month: "Jun", "OP": 64000, },
    { month: "Jul", "OP": 66000, },
    { month: "Aug", "OP": 68000, },
    { month: "Sep", "OP": 63000, },
    { month: "Oct", "OP": 61000, },
    { month: "Nov", "OP": 59000, },
    { month: "Dec", "OP": 65000, }
];
const CinemasStats = () => {
    const periods = ['month', 'day'];
    const [period, setPeriod] = useState(0);
    return (
        <Box>
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
                <Typography variant="h6">Revenue Statistics</Typography>
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
            <LineChart
                height={400}
                dataset={data}
                xAxis={[{ scaleType: "point", dataKey: "month" }]}
                series={[
                    { dataKey: "OP", label: "Kyiv, Ocean Plaza", color: "#1976D2" },
                ]}
            />
        </Box>
    )
}

export default CinemasStats