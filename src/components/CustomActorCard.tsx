import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

const CustomActorCard = ({ hasPhoto, url, name, characterName }) => {
  //   console.log(url);
  //   console.log(name);

  return (
    <Card
      sx={{
        margin: "10px",
        padding: "10px",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      <CardMedia
        component="img"
        image={hasPhoto ? url : "/no-picture-available.png"}
        sx={{
          borderRadius: "4px",
        }}
      />

      <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
        {name}
      </Typography>
      <Typography
        variant="caption"
        sx={{ mt: 1, display: "block", textAlign: "center", color: "grey" }}
      >
        as "{characterName}"
      </Typography>
      {/* <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions> */}
    </Card>
  );
};

export default CustomActorCard;
