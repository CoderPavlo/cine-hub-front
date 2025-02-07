import { Box, Typography } from '@mui/material'

import { BarChart } from '@mui/x-charts/BarChart';

const data = [
    { genre: "Action", movies: 120, ticketsSold: 500000, revenue: 80000000 },
    { genre: "Comedy", movies: 90, ticketsSold: 400000, revenue: 60000000 },
    { genre: "Drama", movies: 110, ticketsSold: 350000, revenue: 50000000 },
    { genre: "Horror", movies: 70, ticketsSold: 300000, revenue: 40000000 },
    { genre: "Sci-Fi", movies: 85, ticketsSold: 450000, revenue: 75000000 }
];
const GenresStats = () => {
    return (
        <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>Genres Statistics</Typography>
            <BarChart
                height={400}
                dataset={data}
                xAxis={[{ scaleType: "band", dataKey: "genre" }]}
                series={[
                    { dataKey: "movies", label: "Number of Movies", color: "#1976D2" },
                    { dataKey: "ticketsSold", label: "Tickets Sold", color: "#E53935" },
                    { dataKey: "revenue", label: "Revenue ($)", color: "#43A047" }
                ]}
            />
        </Box>
    )
}

export default GenresStats