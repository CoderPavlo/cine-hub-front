import { styled, Card, IconButton, Box, Button, CardContent, CardMedia, Chip, Typography, Link } from '@mui/material';
import { Genre, Movie } from '../../models/movie';
import { PlayArrow, BookmarkAdd } from '@mui/icons-material';
import { BASE_IMG_URL } from '../../helpers/apiConfig';
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
interface MovieCardProps {
    movie: Movie,
    genresData?: { genres: Genre[] },
    buttonOnClick: () => void,
}
export default function MovieCard({ movie, genresData, buttonOnClick }: MovieCardProps) {
    return (
        <Link href={`/movie/${movie.id}`} underline="none">
            <StyledCard>
                <CardMedia
                    component="img"
                    image={`${BASE_IMG_URL}w500${movie.poster_path}`}
                    alt={movie.title}
                    sx={{ aspectRatio: "2/3", objectFit: "cover" }}
                    loading="lazy"
                />
                <CardContent>
                    <Typography variant="h6">{movie.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                        Rating: {movie.vote_average.toFixed(1)}
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
                            onClick={(e) => {
                                e.preventDefault();
                                buttonOnClick();
                            }}
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
        </Link>
    )
}
