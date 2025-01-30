import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Box, Button, Card, CardContent, Grid, CardMedia } from "@mui/material";
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

  //(replace this with API data when available)
  const placeholderMovies: Movie[] = [
    {
      id: 1,
      name: "Movie Title 1",
      posterUrl: "https://via.placeholder.com/150",
      description: "This is a placeholder description for Movie Title 1.",
      ratings: 8.5,
    },
    {
      id: 2,
      name: "Movie Title 2",
      posterUrl: "https://via.placeholder.com/150",
      description: "This is a placeholder description for Movie Title 2.",
      ratings: 7.8,
    },
    {
      id: 3,
      name: "Movie Title 3",
      posterUrl: "https://via.placeholder.com/150",
      description: "This is a placeholder description for Movie Title 3.",
      ratings: 9.1,
    },
  ];

  const handleMovieClick = (id: number) => {
    navigate(`/movies/${id}`);
  };

  return (
    <Container maxWidth="lg" sx={{ textAlign: "center", mt: 5, mb: 10 }}>
      <Typography variant="h2" gutterBottom>
        Welcome to CinemaHub
      </Typography>
      <Typography variant="h6" color="text.secondary" paragraph>
        Experience the latest movies with the best quality and comfort. Book your tickets online and enjoy exclusive screenings!
      </Typography>
      
      <Box mt={4}>
        <Card sx={{ p: 3, boxShadow: 3 }}>
          <CardContent>
            <Typography variant="h5" gutterBottom>
              Discover Our Features
            </Typography>
            <Typography variant="body1" color="text.secondary">
              - Easy online booking system<br/>
              - Comfortable seats & premium sound experience<br/>
              - Special discounts for members
            </Typography>
            <Box mt={3}>
              <Button variant="contained" color="primary" size="large" startIcon={<PlayCircleOutline />}> 
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
          {placeholderMovies.map((movie) => (
            <Grid item xs={12} sm={6} md={4} key={movie.id}>
              <Card sx={{ boxShadow: 3, cursor: "pointer" }} onClick={() => handleMovieClick(movie.id)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={movie.posterUrl}
                  alt={movie.name}
                />
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {movie.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {movie.description}
                  </Typography>
                  <Typography variant="body1" color="primary">
                    Rating: {movie.ratings}
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
