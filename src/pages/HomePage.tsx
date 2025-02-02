import { Container } from '@mui/material'
import { useState } from 'react'
import TicketsBlock from '../components/home/TicketsBlock'
import { themoviedbAPI } from '../store/api/themoviedb'
import MovieBlock from '../components/home/MovieBlock'
export default function HomePage() {
    const [recPage, setRecPage] = useState(1);
    const [page, setPage] = useState(1);
    const { data: newMovies, isFetching: isFetchingNew, error: errorNew, refetch: refetchNew } = themoviedbAPI.useFetchNewMoviesQuery(page);
    const { data: genresData } = themoviedbAPI.useFetchGenresQuery();
    const { data, isFetching, error, refetch } = themoviedbAPI.useFetchPopularMoviesQuery(recPage);
    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <TicketsBlock />
            <MovieBlock
                title="Recommended for You"
                page={recPage}
                setPage={(page) => setRecPage(page)}
                data={data}
                isFetching={isFetching}
                error={Boolean(error)}
                refetch={refetch}
                genresData={genresData}
                top={300}
            />
            <MovieBlock
                title="New Releases"
                page={page}
                setPage={(page) => setPage(page)}
                data={newMovies}
                isFetching={isFetchingNew}
                error={Boolean(errorNew)}
                refetch={refetchNew}
                genresData={genresData}
                top={5100}
            />
        </Container>
    )
}
