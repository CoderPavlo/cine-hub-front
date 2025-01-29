import { useEffect, useState } from "react";
import "./AboutMoviePage.scss";
import { useParams } from "react-router-dom";
import {
  API_BASE_URL,
  API_KEY,
  BASE_IMG_URL,
} from "../../helpers/apiConfig.js";

// Movie id of Heretic 1138194
function AboutMoviePage() {
  const { id: movieId } = useParams();
  const [movieData, setMovieData] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);
  const [cast, setCast] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    // const getTrailer = async (movieID) => {
    //   const url = `${API_BASE_URL}movie/${movieID}/videos?language=en-US&api_key=${API_KEY}`;
    //   try {
    //     const response = await fetch(url);
    //     const data = await response.json();

    //     if (data.results && data.results.length > 0) {
    //       setTrailerKey(data.results[0].key);
    //     } else {
    //       setErrorMessage("Unable to load trailer for this movie :/");
    //     }
    //   } catch (error) {
    //     setErrorMessage("An error occurred while fetching the trailer.");
    //   }
    // };

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
        console.log("Trailer Data:");
        console.log(data);

        if (data.results && data.results.length > 0) {
          setTrailerKey(data.results[0].key);
        } else {
          setErrorMessage(
            "We were unable to find a video preview for this movie :/"
          );
        }
      })
      .catch((error) =>
        console.error("An error occurred while fetching the trailer:", error)
      );

    fetch(`${API_BASE_URL}movie/${movieId}/credits?api_key=${API_KEY}`)
      .then((response) => response.json())
      .then((data) => {
        console.log("Cast Data:");
        console.log(data);

        if (data.cast && data.cast.length > 0) {
          setCast(data.cast);
        } else {
          setErrorMessage("No cast found for this movie :/");
        }
      })
      .catch((error) =>
        console.error("An error occurred while fetching the cast:", error)
      );
  }, [movieId]);

  if (!movieData) {
    return (
      <div style={{ fontSize: "40px", color: "white", backgroundColor: "red" }}>
        Loading...
      </div>
    );
  }
  console.log(movieData);
  console.log(`${BASE_IMG_URL}original/${movieData.backdrop_path}`);

  //   $("#movie-name").text(response.original_title);
  //       $("#movie-status").text(response.status);
  //       $("#movie-summary").text(response.overview);
  //       $("#movie-poster")
  //         .attr("src", imgURL)
  //         .attr("alt", response.original_title);
  //       $("#movie-rating").text(response.vote_average);
  //       $("#movie-release").text(response.release_date.substring(0, 4));
  //       response.runtime !== null
  //         ? $("#movie-runtime").text(response.runtime + " mins")
  //         : "";

  return (
    <div>
      <div className="movie-page-container">
        <div className="movie-photo-section">
          <div className="movie-photo-container">
            <img
              className="movie-poster"
              src={`${BASE_IMG_URL}original/${movieData.poster_path}`}
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
              <p className="key">Duration:</p>
              <p className="val">
                {movieData.runtime !== null
                  ? `${movieData.runtime} minutes`
                  : "N/A"}
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
          <p>{movieData.overview || "No description available."}</p>

          <p>Watch trailer:</p>
          {trailerKey ? (
            <div className="iframe-container">
              <iframe
                src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                allowFullScreen
                title="Movie Trailer"
              ></iframe>
            </div>
          ) : errorMessage ? (
            <p className="lead">{errorMessage}</p>
          ) : (
            <p>Loading...</p>
          )}
        </div>
        <div className="movie-sessions-section">movie-sessions-section</div>
      </div>
    </div>
  );
}

export default AboutMoviePage;
