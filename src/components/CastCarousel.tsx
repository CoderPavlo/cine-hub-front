import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CustomActorCard from "./CustomActorCard";
import { BASE_IMG_URL } from "../helpers/apiConfig.js";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useState } from "react";

export default function SimpleSlider({ cast }) {
  console.log("Cast props:", cast);

  var settings = {
    dots: true,
    infinite: false,
    // speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: (
      <ArrowForwardIosIcon
        color="primary"
        fontSize="large"
        sx={{ opacity: 0.6 }}
      />
    ),
    prevArrow: (
      <ArrowBackIosIcon
        color="primary"
        fontSize="large"
        sx={{ opacity: 0.6 }}
      />
    ),
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        {cast.map((actor) => (
          <CustomActorCard
            key={actor.id}
            hasPhoto={actor.profile_path ? true : false}
            url={BASE_IMG_URL + "w342/" + actor.profile_path}
            name={actor.name}
            characterName={actor.character}
          />
        ))}
      </Slider>
    </div>
  );
}
