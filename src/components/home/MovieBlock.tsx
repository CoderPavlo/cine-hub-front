import { useEffect } from 'react'
import { Genre, Movie } from '../../models/movie'
import { Typography, Grid2, Pagination } from '@mui/material';
import LoadingComponent from '../common/LoadingComponent';
import MovieCard from './MovieCard';
import MovieCardSkeleton from './MovieCardSkeleton';
import { GetRequest } from '../../models/api';
interface MovieBlockProps {
  title: string,
  page: number,
  setPage: (page: number) => void,
  data?: GetRequest<Movie>,
  isFetching: boolean,
  error: boolean,
  refetch: () => void,
  genresData?: { genres: Genre[] },
  top: number,
  setMovieId: (id: number) => void,
}
export default function MovieBlock({ title, page, setPage, data, isFetching, error, refetch, genresData, top, setMovieId }: MovieBlockProps) {
  useEffect(() => {
    if (data) {
      window.scrollTo({ top: top, behavior: "smooth" });
    }
  }, [page]);
  return (
    <>
      <Typography variant="h5" gutterBottom sx={{ mt: 3 }} color="textPrimary">
        {title}
      </Typography>
      <LoadingComponent loading={isFetching} error={error} refetch={refetch} height="536px"
        skeleton={(
          <Grid2 container spacing={3}>
            {[...Array(3)].map((item, index) => (
              <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                <MovieCardSkeleton />
              </Grid2>
            ))}
          </Grid2>
        )}
      >
        <Grid2 container spacing={3}>
          {data && data.results.map((movie) => (
            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
              <MovieCard movie={movie} genresData={genresData} buttonOnClick={() => setMovieId(movie.id)} />
            </Grid2>
          ))}
        </Grid2>
      </LoadingComponent>
      {data && data.total_pages > 1 &&
        <Pagination count={data?.total_pages} variant="outlined" color="primary" page={page} onChange={(e, page) => setPage(page)}
          size='large'
          sx={{
            paddingBlock: 2,
            display: 'flex',
            justifyContent: 'center'
          }}
        />
      }
    </>
  );
}
