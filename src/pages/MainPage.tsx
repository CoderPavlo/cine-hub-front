import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
  Grid,
  CardMedia,
} from "@mui/material";
import { PlayCircleOutline } from "@mui/icons-material";

interface Movie {
  id: number;
  name: string;
  posterUrl: string;
  description: string;
  ratings: number;
}

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=0342f04e0e2b5df87c3a3392fe93fec7&language=en-US&page=1`
        );
        const data = await response.json();
        const formattedMovies = data.results.map((movie: any) => ({
          id: movie.id,
          name: movie.title,
          posterUrl: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          description: movie.overview,
          ratings: movie.vote_average,
        }));
        setMovies(formattedMovies);
      } catch (error) {
        console.error("Error fetching movies:", error);
      }
    };

    fetchMovies();
  }, []);

  const handleMovieClick = (id: number) => {
    navigate(`/movie/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 5, mb: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to CinemaHub
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Experience the latest movies with the best quality and comfort. Book
        your tickets online and enjoy exclusive screenings!
      </Typography>

      <Box mt={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Discover Our Features
            </Typography>
            <Typography variant="body1" color="text.secondary">
              - Easy online booking system
              <br />
              - Comfortable seats & premium sound experience
              <br />- Special discounts for members
            </Typography>
            <Box mt={3}>
              <Button
                variant="contained"
                color="primary"
                size="large"
                startIcon={<PlayCircleOutline />}
              >
                Browse Movies
              </Button>
            </Box>
          </CardContent>
        </Card>
      </Box>

      <Box mt={5}>
        <Typography variant="h4" gutterBottom>
          Recommended Movies
        </Typography>
        <Grid container spacing={4}>
          {movies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card
                sx={{
                  boxShadow: 3,
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                }}
                onClick={() => handleMovieClick(movie.id)}
              >
                <CardMedia
                  component="img"
                  image={movie.posterUrl}
                  alt={movie.name}
                  sx={{ aspectRatio: "2/3", objectFit: "cover" }}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" gutterBottom>
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {movie.description}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    Rating: {movie.ratings.toFixed(1)}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
};

export default MainPage;
