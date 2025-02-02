import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ActorCard from "./ActorCard.js";
import { BASE_IMG_URL } from "../../helpers/apiConfig.ts";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Box } from "@mui/material";

export interface Actor {
  id: number;
  profile_path: string | null;
  name: string;
  character: string;
}

interface CastCarouselProps {
  cast: Actor[];
}

const CastCarousel: React.FC<CastCarouselProps> = ({ cast }) => {
  var settings = {
    dots: cast.length < 10 ? true : false,
    infinite: false,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1399,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
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
    <Box
      sx={{
        maxWidth: { xs: "80%", lg: "100%" },
        alignSelf: "center",
      }}
    >
      <Slider {...settings}>
        {cast.map((actor) => (
          <ActorCard
            key={actor.id}
            hasPhoto={actor.profile_path ? true : false}
            url={BASE_IMG_URL + "w342/" + actor.profile_path}
            name={actor.name}
            characterName={actor.character}
          />
        ))}
      </Slider>
    </Box>
  );
};
export default CastCarousel;
