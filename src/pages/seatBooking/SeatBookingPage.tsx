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
  useTheme,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import { useLocation, useSearchParams } from "react-router-dom";
import { CalendarToday, LocationOn, Schedule } from "@mui/icons-material";
import SeatPlan from "../../components/seatBooking/SeatPlan";
import { useState } from "react";
import SelectedSeats from "../../components/seatBooking/SelectedSeats";
import serverAPI from "../../store/api/server";
import { BASE_IMG_URL } from "../../helpers/apiConfig";
import dayjs from "dayjs";
import { themoviedbAPI } from "../../store/api/themoviedb";
import { TicketSeat } from "../../models/tickets";

const SeatBookingPage: React.FC = () => {

  const theme = useTheme();
  const [selectedSeats, setSelectedSeats] = useState<TicketSeat[]>([]);

  const [searchParams] = useSearchParams();
  const id = searchParams.get('id') || '';
  const { data } = serverAPI.useFetchReservedQuery(id);
  const { data: movie } = themoviedbAPI.useFetchMovieQuery(data?.session.filmId || 0);

  const handleSeatClick = (seat: TicketSeat) => {
    setSelectedSeats(prev =>
      prev.some(item => item.row === seat.row && item.seat === seat.seat) ?
        prev.filter(item => !(item.row === seat.row && item.seat === seat.seat)) :
        [...prev, seat]
    );
  };

  const handleDeleteTicketClick = (seat: TicketSeat) => {
    setSelectedSeats(prev =>
      prev.filter(item => !(item.row === seat.row && item.seat === seat.seat))
    );
  };
  const [create, { isLoading, error }] = serverAPI.useCreateTicketMutation();

  const handleBookingTicketClick = async () => {
    selectedSeats.forEach(async item => {
      await create({
        sessionId: id,
        rowNumber: item.row,
        seatNumber: item.seat,
        price: Number(data?.session.price),
      });
    });
    setSelectedSeats([]);
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
              image={`${BASE_IMG_URL}original/${movie?.poster_path}`}
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
                {data?.session.filmName}
              </Typography>
              <Box>
                <Chip
                  label={data?.session.formatType}
                  component="span"
                  sx={{
                    mr: 2,
                  }}
                />
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
                    {data?.session.cinemaLocation}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      fontSize: "14px",
                    }}
                  >
                    Hall: {data?.session.auditoriumName}
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
                    {dayjs(data?.session.startTime).date()}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      color: "text.secondary",
                      fontSize: "14px",
                    }}
                  >
                    {dayjs(data?.session.startTime).format("dddd")}
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
                    {dayjs(data?.session.startTime).format('HH:mm')}
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
          <SeatPlan selectedSeats={selectedSeats} price={data?.session.price || 0} seats={data?.seats || 0} rows={data?.rows || 0} reservedSeats={data?.reservedSeats || []} handleSeatClick={handleSeatClick} />
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
                <span style={{ color: theme.palette.primary.main }}>{selectedSeats.length}</span>
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
                <span style={{ color: theme.palette.primary.main }}>
                  {((data?.session.price || 0) * selectedSeats.length).toFixed(3)} $
                </span>
              </Typography>
            </Box>
            <Box sx={{ bgcolor: "background.default", borderRadius: 2 }}>
              <SelectedSeats
                price={data?.session.price || 0}
                rows={data?.rows || 0}
                selectedSeats={selectedSeats}
                handleDeleteTicketClick={handleDeleteTicketClick}
                handleBookingTicketClick={handleBookingTicketClick}
                loading={isLoading}
                error={error}
              />
            </Box>
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default SeatBookingPage;
