import "./AboutMoviePage.css";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  API_KEY,
  BASE_IMG_URL,
} from "../../helpers/apiConfig.ts";
import {
  Box,
  CircularProgress,
  Container,
  Typography,
  CardMedia,
  Stack,
  Paper,
  Divider,
  Grid2,
} from "@mui/material";
import CastCarousel from "../../components/moviePage/CastCarousel.js";
import MovieSessions from "../../components/moviePage/MovieSessions.js";
import { useTheme } from "@emotion/react";

// Ids of films: 1138194, 539972, 426063, 1249289, 970450, 1184918, 1064213, 993710, 970450

const InfoItem = ({ label, value }: { label: string; value: string }) => (
  <Box>
    <Typography variant="caption" color="text.secondary">
      {label}:
    </Typography>
    <Typography variant="body1" sx={{ color: "text.primary" }}>
      {value}
    </Typography>
  </Box>
);

export default function AboutMoviePage() {
  const { id: movieId } = useParams();
  const [movieData, setMovieData] = useState<any>(null);
  const [trailerKey, setTrailerKey] = useState<string | null>(null);
  const [cast, setCast] = useState<any[] | null>(null);
  const [crew, setCrew] = useState<any[] | null>(null);
  const [trailerErrorMessage, setTrailerErrorMessage] = useState<string | null>(
    null
  );
  const [castErrorMessage, setCastErrorMessage] = useState<string | null>(null);

  function getMovieDuration(minutes: string) {
    const m = parseInt(minutes);
    const hours = Math.floor(m / 60);
    const mins = m - hours * 60;
    return `${hours.toString().padStart(2, "0")}:${mins}`;
  }

  useEffect(() => {
    // 1. Loading movie main info
    fetch(`${API_BASE_URL}movie/${movieId}?language=en-US&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovieData(data))
      .catch((error) => console.error("Failed to fetch movie data:", error));

    // 2. Loading trailer
    fetch(
      `${API_BASE_URL}movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.results && data.results.length > 0) {
          setTrailerKey(data.results[0].key);
        } else {
          setTrailerErrorMessage("No video preview found for this movie :/");
        }
      })
      .catch((error) =>
        console.error("An error occurred while fetching the trailer:", error)
      );

    // 3. Loading cast and film crew
    fetch(`${API_BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.cast && data.cast.length > 0) {
          setCast(data.cast);
        } else {
          setCastErrorMessage("No cast found for this movie :/");
        }

        if (data.crew && data.crew.length > 0) {
          setCrew(data.crew);
        }
      })
      .catch((error) =>
        console.error("An error occurred while fetching cast and crew:", error)
      );
  }, [movieId]);


  if (!movieData) {
    return (
      <Box
        sx={{
          display: "flex",
          height: "100vh",
          justifyContent: "center",
          alignItems: "center",
          bgcolor: "background.default",
        }}
      >
        <CircularProgress size={60} />
      </Box>
    );
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: "32px",
        paddingBottom: "55px",
        px: { xs: "0 !important", lg: "24px !important" },
        bgcolor: "background.default",
      }}
    >
      {/* Movie Poster section */}
      <Grid2 container spacing={{ xs: 6, lg: 8 }}>
        <Grid2
          size={{ xs: 12, lg: "auto" }}
          sx={{
            width: { xs: "100%", lg: "250px" },
            order: { xs: 1, lg: 1 },
          }}
        >
          <Box
            sx={{
              position: { xs: "relative", lg: "sticky" },
              top: { xs: 0, lg: 88 },
              maxHeight: { xs: "65vh", lg: "auto" },
              background: { xs: "rgba(0, 0, 0)", lg: "none" },

              // Dark overlay on the image container
              "&:after": {
                xs: {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0, 0, 0, 0.5)",
                },
                lg: { display: "none" },
              },
            }}
          >
            <CardMedia
              component="img"
              id="moviePoster"
              image={
                movieData.poster_path
                  ? `${BASE_IMG_URL}original/${movieData.poster_path}`
                  : "/no-picture-available.png"
              }
              alt={movieData.original_title}
              sx={{
                borderRadius: 2,
                height: { xs: "100%", lg: "auto" },
                objectFit: "contain",
                maxHeight: "65vh",
              }}
            />
          </Box>
          <Typography
            variant="h3"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              textAlign: "center",
              my: 2,
              display: { xs: "block", lg: "none" },
            }}
          >
            {movieData.title}
          </Typography>
          <Divider
            sx={{
              display: { xs: "block", lg: "none" },
            }}
          />
        </Grid2>

        {/* Movie Details section */}
        <Grid2
          size={{ xs: 12, lg: "grow" }}
          sx={{ order: { xs: 3, lg: 2 }, px: { xs: "24px", lg: "0" } }}
        >
          <Typography
            id="movieName"
            variant="h3"
            sx={{
              color: "primary.main",
              fontWeight: 700,
              mb: 2,
              display: { xs: "none", lg: "block" },
            }}
          >
            {movieData.title}
          </Typography>

          <Divider />

          {/* Short Info About Movie */}
          <Stack spacing={2} sx={{ mb: 3 }}>
            <Grid2 container spacing={0}>
              <Grid2
                size={{ xs: 6, lg: 4 }}
                sx={{ padding: "16px 16px 0 0 !important" }}
              >
                <InfoItem
                  label="iMDB Rating"
                  value={movieData.vote_average.toFixed(1) || "N/A"}
                />
              </Grid2>
              <Grid2
                size={{ xs: 6, lg: 4 }}
                sx={{ padding: "16px 16px 0 0 !important" }}
              >
                <InfoItem
                  label="Release Date"
                  value={
                    `${movieData.release_date.slice(
                      -2
                    )}.${movieData.release_date.slice(
                      -5,
                      -3
                    )}.${movieData.release_date.slice(0, 4)}` || "N/A"
                  }
                />
              </Grid2>
              <Grid2
                size={{ xs: 6, lg: 4 }}
                sx={{ padding: "16px 16px 0 0 !important" }}
              >
                <InfoItem
                  label="Director"
                  value={
                    crew
                      ? crew
                          .filter((p) => p.job === "Director")
                          .map((d) => d.name)
                          .join(", ")
                      : "N/A"
                  }
                />
              </Grid2>
              <Grid2
                size={{ xs: 6, lg: 4 }}
                sx={{ padding: "16px 16px 0 0 !important" }}
              >
                <InfoItem
                  label="Duration"
                  value={
                    movieData.runtime
                      ? getMovieDuration(movieData.runtime)
                      : "N/A"
                  }
                />
              </Grid2>
              <Grid2
                size={{ xs: 6, lg: 4 }}
                sx={{ padding: "16px 16px 0 0 !important" }}
              >
                <InfoItem
                  label="Genres"
                  value={
                    movieData.genres?.map((g: any) => g.name).join(", ") ||
                    "N/A"
                  }
                />
              </Grid2>
              <Grid2
                size={{ xs: 6, lg: 4 }}
                sx={{ padding: "16px 16px 0 0 !important" }}
              >
                <InfoItem
                  label="Production country"
                  value={
                    movieData.production_countries
                      ?.map((g: any) => g.name)
                      .join(", ") || "N/A"
                  }
                />
              </Grid2>
            </Grid2>

            <Divider />

            {movieData.overview ? (
              <Typography
                variant="body1"
                sx={{ color: "text.primary", textAlign: "justify" }}
              >
                {movieData.overview}
              </Typography>
            ) : (
              <Typography variant="body1" color="error">
                No description found for this movie :/
              </Typography>
            )}

            <Divider />

            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                textAlign: { xs: "center", lg: "start" },
              }}
            >
              Watch Trailer
            </Typography>

            {/* Movie`s Trailer */}
            {trailerKey ? (
              <Box
                sx={{
                  position: "relative",
                  width: "100%",
                  maxWidth: "800px",
                  aspectRatio: "16/9",
                  borderRadius: 2,
                  overflow: "hidden",
                  alignSelf: "center",
                }}
              >
                <iframe
                  src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                  allowFullScreen
                  title="Movie Trailer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    border: 0,
                  }}
                />
              </Box>
            ) : trailerErrorMessage ? (
              <Typography color="error">{trailerErrorMessage}</Typography>
            ) : (
              <Box sx={{ pt: "56.25%", position: "relative" }}>
                <CircularProgress
                  size={40}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "primary.main",
                  }}
                />
              </Box>
            )}

            <Divider />

            <Typography
              variant="h5"
              sx={{
                color: "text.primary",
                fontWeight: 600,
                textAlign: { xs: "center", lg: "start" },
              }}
            >
              Cast
            </Typography>

            {/* Movie`s Actors */}
            {cast ? (
              <CastCarousel cast={cast} />
            ) : castErrorMessage ? (
              <Typography color="error">{castErrorMessage}</Typography>
            ) : (
              <Box sx={{ height: 200, position: "relative" }}>
                <CircularProgress
                  size={40}
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    color: "primary.main",
                  }}
                />
              </Box>
            )}
          </Stack>
        </Grid2>

        {/* Movie Sessions Section */}
        <Grid2
          size={{ xs: 12, lg: "auto" }}
          sx={{
            width: { xs: "100%", lg: "375px", maxWidth: "800px" },
            order: { xs: 2, lg: 3 },
            mx: "auto",
          }}
        >
          <Paper
            sx={{
              p: 2,
              position: { xs: "relative", lg: "sticky" },
              top: { xs: "auto", lg: 88 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
              maxHeight: { xs: "auto", lg: "calc(100vh - 180px)" },
            }}
          >
            <Typography
              variant="h6"
              gutterBottom
              sx={{ color: "primary.main", fontWeight: 600 }}
            >
              Schedule of sessions
            </Typography>
            <Box sx={{ p: 2, bgcolor: "background.default", borderRadius: 2 }}>
              <MovieSessions movieId={Number(movieId)}/>
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
}
