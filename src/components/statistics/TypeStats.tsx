import { Box, Typography } from '@mui/material'
import { LineChart } from "@mui/x-charts/LineChart";

const data = [
    { month: "Jan", "3D": 50000, "2D": 40000, Lux: 60000 },
    { month: "Feb", "3D": 55000, "2D": 42000, Lux: 65000 },
    { month: "Mar", "3D": 60000, "2D": 45000, Lux: 70000 },
    { month: "Apr", "3D": 58000, "2D": 43000, Lux: 69000 },
    { month: "May", "3D": 62000, "2D": 47000, Lux: 72000 },
    { month: "Jun", "3D": 64000, "2D": 49000, Lux: 75000 },
    { month: "Jul", "3D": 66000, "2D": 50000, Lux: 77000 },
    { month: "Aug", "3D": 68000, "2D": 52000, Lux: 80000 },
    { month: "Sep", "3D": 63000, "2D": 51000, Lux: 78000 },
    { month: "Oct", "3D": 61000, "2D": 48000, Lux: 74000 },
    { month: "Nov", "3D": 59000, "2D": 46000, Lux: 71000 },
    { month: "Dec", "3D": 65000, "2D": 50000, Lux: 76000 }
];
const TypeStats = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Format Types Statistics</Typography>
            <LineChart
                height={410}
                dataset={data}
                xAxis={[{ scaleType: "point", dataKey: "month" }]}
                series={[
                    { dataKey: "3D", label: "3D Revenue", color: "#1976D2" },
                    { dataKey: "2D", label: "2D Revenue", color: "#E53935" },
                    { dataKey: "Lux", label: "Lux Revenue", color: "#43A047" }
                ]}
            />
        </Box>
    )
}

export default TypeStats