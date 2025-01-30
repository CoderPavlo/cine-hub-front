import { useEffect, useState } from "react";
import "./AboutMoviePage.scss";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  API_KEY,
  BASE_IMG_URL,
} from "../../helpers/apiConfig.js";
import { Box, CircularProgress } from "@mui/material";
import CastCarousel from "../../components/CastCarousel.js";

// Movie id of Heretic 1138194
function AboutMoviePage() {
  const { id: movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState(null);
  const [crew, setCrew] = useState(null);
  const [trailerErrorMessage, setTrailerErrorMessage] = useState(null);
  const [castErrorMessage, setCastErrorMessage] = useState(null);

  useEffect(() => {
    // Loading movie main info
    fetch(`${API_BASE_URL}movie/${movieId}?language=en-US&api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => setMovieData(data))
      .catch((error) => console.error("Failed to fetch movie data:", error));

    // Loading trailer
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

    // Loading cast and film crew
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
          position: "absolute",
          height: "100vh",
          width: "100vw",
          zIndex: "999",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CircularProgress size="60px" />
      </Box>
    );
  }

  console.log(movieData);

  return (
    <div>
      <div className="movie-page-container">
        <div className="movie-photo-section">
          <div className="movie-photo-container">
            <img
              className="movie-poster"
              src={
                movieData.poster_path
                  ? `${BASE_IMG_URL}original/${movieData.poster_path}`
                  : "/no-picture-available.png"
              }
              alt={movieData.original_title}
            />
          </div>
        </div>
        <div className="movie-details-section">
          <h1>{movieData.title}</h1>
          <div className="movie-main-info-container">
            <div>
              <p className="key">iMDB Rating:</p>
              <p className="val">{movieData.vote_average || "N/A"}</p>
            </div>
            <div>
              <p className="key">Release Date:</p>
              <p className="val">{movieData.release_date || "N/A"}</p>
            </div>
            <div>
              <p className="key">Director:</p>
              <p className="val">
                {crew
                  ? crew
                      .filter((person) => person.job === "Director")
                      .map((dir) => dir.name)
                      .join(", ")
                  : "N/A"}
              </p>
            </div>
            <div>
              <p className="key">Duration:</p>
              <p className="val">
                {movieData.runtime ? `${movieData.runtime} minutes` : "N/A"}
              </p>
            </div>
            <div>
              <p className="key">Genres:</p>
              <p className="val">
                {movieData.genres
                  ? movieData.genres.map((genre) => genre.name).join(", ")
                  : "N/A"}
              </p>
            </div>
          </div>
          <p>
            {movieData.overview || "No description found for this movie :/"}
          </p>

          <p>Watch Trailer</p>
          {trailerKey ? (
            <div className="iframe-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            </div>
          ) : trailerErrorMessage ? (
            <p className="lead">{trailerErrorMessage}</p>
          ) : (
            <Box
              sx={{
                paddingTop: "56.25%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress size="40px" />
              </Box>
            </Box>
          )}

          <div>Cast</div>
          {cast ? (
            <CastCarousel cast={cast} />
          ) : castErrorMessage ? (
            <p className="lead">{castErrorMessage}</p>
          ) : (
            <Box
              sx={{
                paddingTop: "56.25%",
                position: "relative",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                }}
              >
                <CircularProgress size="40px" />
              </Box>
            </Box>
          )}
        </div>
        <div className="movie-sessions-section">movie-sessions-section</div>
      </div>
    </div>
  );
}

export default AboutMoviePage;
