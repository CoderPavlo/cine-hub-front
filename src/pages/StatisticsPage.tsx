import GeneralStats from '../components/statistics/GeneralStats'
import { Container, Grid2 } from '@mui/material'
import GenresStats from '../components/statistics/GenresStats'
import FilmStats from '../components/statistics/FilmStats'
import TypeStats from '../components/statistics/TypeStats'
import CinemasStats from '../components/statistics/CinemasStats'


const StatisticsPage = () => {
    return (
        <Container sx={{ my: 4, maxWidth: '100% !important' }}>

            <Grid2 container spacing={2}>
                <GeneralStats />
                <Grid2 size={{xs: 12, md: 7}}>
                    <GenresStats/>
                </Grid2>
                <Grid2 size={{xs: 12, md: 5}}>
                    <FilmStats/>
                </Grid2>
                <Grid2 size={{xs: 12, md: 6}}>
                    <CinemasStats/>
                </Grid2>
                <Grid2 size={{xs: 12, md: 6}}>
                    <TypeStats/>
                </Grid2>
            </Grid2>
        </Container>
    )
}

export default StatisticsPage