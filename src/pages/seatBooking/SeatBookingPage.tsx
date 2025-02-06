import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Grid2,
  Paper,
  Tooltip,
  Typography,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useLocation } from "react-router-dom";
import { CalendarToday, LocationOn, Schedule } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import SeatPlan from "../../components/seatBooking/SeatPlan";
import { useState } from "react";
import SelectedSeats from "../../components/seatBooking/SelectedSeats";

export interface Seat {
  id: string;
  row: number;
  place: number;
  status: "available" | "booked" | "selected";
  type: "standard" | "lux";
  price: number;
}

export interface SeatBookingInfo {
  movieId: string;
  auditorium: string;
  cinema: string;
  date: string;
  format: string;
  time: string;
  seats: Seat[];
}

function mockSeatPlan() {
  const index = ["A", "B", "C", "D", "E", "F", "G", "H", "I"];
  const seats: Seat[] = [];
  for (let i = 0; i <= 8; i++) {
    for (let j = 0; j < 8; j++) {
      seats.push({
        id: index[i] + i + j,
        row: i + 1,
        place: j + 1,
        status: Math.floor(Math.random() * 7) > 4 ? "booked" : "available",
        type: i === 8 ? "lux" : "standard",
        price: i === 8 ? 280 : 180,
      });
    }
  }

  const seatRows = seats.reduce((acc, s) => {
    if (!acc[s.row]) {
      acc[s.row] = [];
    }
    acc[s.row].push(s);
    return acc;
  }, {} as Record<string, Seat[]>);

  return seatRows;
}

const initialSeats = mockSeatPlan();

const formatDescription = {
  SDH: "Subtitles for the Deaf or Hard-of-Hearing",
  LUX: "A session on recliner chairs that provide increased viewing comfort for movie enthusiasts",
  VIP: "A session in a separate hall with the option of waiter service directly during the session",
};

const SeatBookingPage: React.FC = () => {
  const [seats, setSeats] = useState(initialSeats);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);

  const theme = useTheme();

  const { state: sessionInfo } = useLocation();

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === "booked") return;

    const newStatus = seat.status === "available" ? "selected" : "available";

    const rowIndex = seat.row;

    const updatedRow = seats[rowIndex].map((s) =>
      s.id === seat.id ? { ...s, status: newStatus } : s
    );

    const updatedSeats = { ...seats, [rowIndex]: updatedRow };

    const newSelected =
      newStatus === "selected"
        ? [...selectedSeats, seat]
        : selectedSeats.filter((s) => s.id !== seat.id);

    setSeats(updatedSeats);
    setSelectedSeats(newSelected);
  };

  const handleDeleteTicketClick = (seat: Seat) => {
    const rowIndex = seat.row;

    const updatedRow = seats[rowIndex].map((s) =>
      s.id === seat.id ? { ...s, status: "available" } : s
    );

    const updatedSeats = { ...seats, [rowIndex]: updatedRow };
    const newSelected = selectedSeats.filter((s) => s.id !== seat.id);

    setSeats(updatedSeats);
    setSelectedSeats(newSelected);
  };

  function handleBookingTicketClick() {
    selectedSeats.map((s) => s.status === "booked");

    const { movieId, auditorium, cinema, date, format, time } = sessionInfo;
    const result = {
      movieId,
      auditorium,
      cinema,
      date,
      format,
      time,
      seats: selectedSeats,
    };
    console.log("ALL INFO ABOUT TICKET BOOKING:");
    console.log(result);
    return result;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        paddingTop: "32px",
        paddingBottom: "55px",
        bgcolor: "background.default",
      }}
    >
      <Grid2 container spacing={4}>
        <Grid2
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            flexGrow: 1,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 3,
              justifyContent: "center",
            }}
          >
            <CardMedia
              component="img"
              sx={{ width: "220px", borderRadius: "8px" }}
              image={sessionInfo.posterUrl}
              alt="Movie poster"
            />
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <Typography
                variant="h4"
                sx={{
                  color: "primary.main",
                  fontWeight: 700,
                }}
              >
                {sessionInfo.movieName}
              </Typography>
              <Box>
                {sessionInfo.format.split(" ").map((f: string, i: number) => (
                  <Tooltip
                    key={i}
                    title={`${formatDescription[f]}`}
                    arrow
                    placement="top"
                  >
                    <Chip
                      label={f}
                      component="span"
                      icon={<QuestionMarkIcon />}
                      sx={{
                        mr: 2,
                        "& .MuiChip-icon": {
                          fontSize: "16px",
                          ml: "8px",
                        },
                      }}
                    />
                  </Tooltip>
                ))}
              </Box>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "2px",
                      height: "100%",
                      background: "rgba(255, 255, 255)",
                    },
                  }}
                >
                  <LocationOn />
                </Box>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "8px 16px !important",
                    "&:last-child": { p: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    {sessionInfo.cinema}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      fontSize: "14px",
                    }}
                  >
                    Hall: {sessionInfo.auditorium}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "2px",
                      height: "100%",
                      background: "rgba(255, 255, 255)",
                    },
                  }}
                >
                  <CalendarToday />
                </Box>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "8px 16px !important",
                    "&:last-child": { p: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    {`${sessionInfo.date.slice(-2)}.${sessionInfo.date.slice(
                      -5,
                      -3
                    )}.${sessionInfo.date.slice(0, 4)}`}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      fontSize: "14px",
                    }}
                  >
                    {new Date(sessionInfo.date).toLocaleDateString("en-GB", {
                      weekday: "long",
                    })}
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ display: "flex" }}>
                <Box
                  sx={{
                    width: "60px",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    position: "relative",
                    "&:after": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      right: 0,
                      width: "2px",
                      height: "100%",
                      background: "rgba(255, 255, 255)",
                    },
                  }}
                >
                  <Schedule />
                </Box>
                <CardContent
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: "8px 16px !important",
                    "&:last-child": { p: 0 },
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 700,
                      fontSize: "16px",
                    }}
                  >
                    {sessionInfo.time}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      fontSize: "14px",
                    }}
                  >
                    Time
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Box>

          {/* Seat Plan */}
          <SeatPlan seats={seats} handleSeatClick={handleSeatClick} />
        </Grid2>

        <Grid2 sx={{ width: "470px", mx: "auto" }}>
          <Paper
            sx={{
              p: 2,
              position: { xs: "relative", md: "sticky" },
              top: { xs: "auto", md: 88 },
              bgcolor: "background.paper",
              borderRadius: 2,
              boxShadow: 3,
              maxHeight: { xs: "auto", md: "calc(100vh - 102px)" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: 2,
              }}
            >
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  marginBottom: 0,
                }}
              >
                Your tickets:{" "}
                <span style={{ color: "#b02e2f" }}>{selectedSeats.length}</span>
              </Typography>
              <Typography
                variant="h6"
                gutterBottom
                sx={{
                  color: "text.primary",
                  fontWeight: 600,
                  marginBottom: 0,
                }}
              >
                Price:{" "}
                <span style={{ color: "#b02e2f" }}>
                  {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)} UAH
                </span>
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "background.default", borderRadius: 2 }}>
              <SelectedSeats
                selectedSeats={selectedSeats}
                handleDeleteTicketClick={handleDeleteTicketClick}
                handleBookingTicketClick={handleBookingTicketClick}
              />
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default SeatBookingPage;
