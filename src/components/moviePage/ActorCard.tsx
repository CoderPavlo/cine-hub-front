import { Typography } from "@mui/material";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";

interface ActorCardProps {
  hasPhoto: boolean;
  url: string;
  name: string;
  characterName: string;
}

const ActorCard: React.FC<ActorCardProps> = ({
  hasPhoto,
  url,
  name,
  characterName,
}) => {
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
          objectFit: "contain",
          objectPosition: "top",
          maxHeight: "60vh",
          borderRadius: "4px",
        }}
      />

      <Typography variant="body1" sx={{ mt: 1, textAlign: "center" }}>
        {name}
      </Typography>
      <Typography
        variant="caption"
        sx={{ mt: 0.5, display: "block", textAlign: "center", color: "grey" }}
      >
        as "{characterName}"
      </Typography>
    </Card>
  );
};

export default ActorCard;
