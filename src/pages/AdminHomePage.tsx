import { Box, Card, CardContent, Grid2, Stack, Typography } from '@mui/material'
import { useState } from 'react'
import FilterBlock, { Filter } from '../components/adminPanel/FilterBlock';
import SheduleForm from '../components/adminPanel/SheduleForm';
const genStats = [
    {
        title: 'Number of scheduled sessions',
        value: 20,
    },
    {
        title: 'Number of films in the cinema',
        value: 15,
    },
    {
        title: 'Number of tickets purchased',
        value: 100,
    },
    {
        title: 'Percentage of halls occupied',
        value: '75 %',
    },
    {
        title: 'Average ticket price',
        value: '150 $',
    },
    {
        title: 'Earned income',
        value: '3000 $',
    },
]

const AdminHomePage = () => {
    const [filter, setFilter] = useState<Filter>({ cinema: null, hall: null, date: null });
    return (
        <Grid2 container px={{ md: '24px' }} my={4} columnSpacing={2}>
            <Grid2 size={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4">Home</Typography>
                    {/* <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Session</Button> */}
                </Box>
                <FilterBlock filter={filter} setFilter={setFilter} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }}>
                <Grid2 container spacing={2}>
                    {genStats.map(item =>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <Card sx={{ height: '100%' }}>
                                <CardContent sx={{ p: 2.25 }}>
                                    <Stack spacing={0.5}>
                                        <Typography variant="h6" color="textSecondary">
                                            {item.title}
                                        </Typography>
                                        <Typography variant="h4" color="textPrimary">
                                            {item.value}
                                        </Typography>
                                    </Stack>
                                </CardContent>
                            </Card>
                        </Grid2>
                    )}
                </Grid2>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }} display='flex' flexDirection='column' height={{ md: '392px' }} overflow='auto'>
                <SheduleForm filter={filter} home />
            </Grid2>
        </Grid2>
    )
}

export default AdminHomePage