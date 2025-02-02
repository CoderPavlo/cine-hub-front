import { styled, Card, IconButton, Box, Button, CardContent, CardMedia, Chip, Typography } from '@mui/material';
import { Genre, Movie } from '../../models/movie';
import { PlayArrow, BookmarkAdd } from '@mui/icons-material';
export const StyledCard = styled(Card)(({ theme }) => ({
    height: "100%",
    display: "flex",
    flexDirection: "column",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.02)"
    }
}));

const getGenres = (genres: number[], allGenres: Genre[]) => {
    let result: string[] = genres.map(id => {
        return allGenres.filter(value => value.id === id)[0].name || '';
    });
    return result;
}
export default function MovieCard({ movie, genresData }: { movie: Movie, genresData?: { genres: Genre[] } }) {
    return (
        <StyledCard>
            <CardMedia
                component="img"
                height="300"
                image={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                loading="lazy"
            />
            <CardContent>
                <Typography variant="h6">{movie.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                    Rating: {movie.vote_average}
                </Typography>
                <Typography variant="body2" sx={{ mt: 1 }}>
                    {movie.overview}
                </Typography>
                <Box sx={{ mt: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
                    {genresData && getGenres(movie.genre_ids, genresData.genres).map((genre) => (
                        <Chip key={genre} label={genre} size="small" />
                    ))}
                </Box>
                <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                    <Button
                        disabled={!movie.video}
                        variant="contained"
                        startIcon={<PlayArrow />}
                    >
                        Watch Trailer
                    </Button>
                    <IconButton>
                        <BookmarkAdd />
                    </IconButton>
                </Box>
            </CardContent>
        </StyledCard>
    )
}
