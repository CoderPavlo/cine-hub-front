import {
  IconButton,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider,
  Box,
  Tooltip,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Chair } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { Seat } from "../../pages/seatBooking/SeatBookingPage";

const SeatPlan = ({
  seats,
  handleSeatClick,
}: {
  seats: Record<number, Seat[]>;
  handleSeatClick: (seat: Seat) => void;
}) => {
  const theme = useTheme();

  const getSeatColor = (seat: Seat) => {
    switch (seat.status) {
      case "booked":
        return "secondary";
      default:
        return seat.type === "lux"
          ? "#b02e2f"
          : theme.palette.mode === "light"
          ? "#000000"
          : "#ffffff";
    }
  };

  const calculateSeatPlanWidth = () => {
    let seatsInARow = 0;
    for (let seatRow in seats) {
      if (seats[seatRow].length > seatsInARow) {
        seatsInARow = seats[seatRow].length;
      }
    }

    return `${seatsInARow * 58}px`;
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        borderRadius: "8px",
        overflowX: "scroll",
      }}
    >
      {/* Сinema screen svg */}
      <Box
        sx={{
          position: "relative",
          mb: "125px",
          width: calculateSeatPlanWidth(),
          mx: "auto",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 806 21"
          fill={theme.palette.mode === "light" ? "#061420" : "#ffffff"}
        >
          <path d="M3.2,20l-2,0.2l-0.3-4l2-0.2C136.2,5.3,269.6,0,403,0s266.8,5.3,400.2,16l2,0.2l-0.3,4l-2-0.2 C669.5,9.3,536.3,4,403,4S136.4,9.3,3.2,20z"></path>
        </svg>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            fontWeight: 700,
            fontSize: "16px",
          }}
        >
          SCREEN
        </Typography>
      </Box>

      {/* Seatplan */}
      {Object.entries(seats).map(([rowNumber, seats]) => (
        <Box
          key={rowNumber}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            width: calculateSeatPlanWidth(),
            mx: "auto",
          }}
        >
          {seats.map((seat: Seat) => (
            <Tooltip
              arrow
              key={seat.id}
              title={
                <Box sx={{ textAlign: "center" }}>
                  {`Row: ${seat.row}, Place: ${seat.place}`}
                  <br />
                  {`Price: `}
                  <span style={{ fontWeight: 600 }}>{seat.price} uah</span>
                </Box>
              }
            >
              <IconButton
                onClick={() => handleSeatClick(seat)}
                disabled={seat.status === "booked"}
                sx={{
                  position: "relative",
                  boxSizing: "border-box",
                  border: "1px solid",
                  borderColor:
                    seat.status === "selected"
                      ? seat.type === "lux"
                        ? theme.palette.primary.main
                        : theme.palette.mode === "light"
                        ? "black"
                        : "white"
                      : "transparent",

                  "&:hover": {
                    bgcolor:
                      seat.type === "lux"
                        ? "rgba(176, 46, 47, 0.2)"
                        : theme.palette.mode === "light"
                        ? "grey.400"
                        : "inherit.hover",
                  },
                  "&.Mui-disabled": {
                    color: "grey.400",
                  },
                }}
              >
                {seat.status === "booked" && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      pointerEvents: "none",
                    }}
                  >
                    <ClearIcon
                      sx={{
                        color:
                          theme.palette.mode === "light"
                            ? "#000000"
                            : "#b02e2f",
                        fontSize: "1.5rem",
                      }}
                    />
                  </Box>
                )}
                <Chair
                  fontSize="large"
                  sx={{
                    fill: getSeatColor(seat),
                  }}
                />
              </IconButton>
            </Tooltip>
          ))}
        </Box>
      ))}

      {/* Legend with different seat types explanation */}
      <Stack
        spacing={3}
        sx={{ mx: "auto", mt: 4, width: calculateSeatPlanWidth() }}
      >
        <Divider />

        <Stack direction="row" spacing={3} justifyContent="center">
          <Chip
            icon={
              <Chair
                sx={{
                  fill: theme.palette.mode === "light" ? "black" : "white",
                }}
              />
            }
            label="Available"
            variant="outlined"
          />
          <Chip
            icon={<Chair color="primary" />}
            label="Lux seats"
            variant="outlined"
          />
          <Chip
            icon={
              <IconButton
                disabled={true}
                sx={{
                  position: "relative",
                  padding: 0,
                  "&.Mui-disabled": {
                    color: "grey.400",
                  },
                }}
              >
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    pointerEvents: "none",
                  }}
                >
                  <ClearIcon
                    sx={{
                      color:
                        theme.palette.mode === "light" ? "#000000" : "#b02e2f",
                      fontSize: "1.2rem",
                    }}
                  />
                </Box>
                <Chair />
              </IconButton>
            }
            label="Booked"
            variant="outlined"
          />
        </Stack>
      </Stack>
    </Paper>
  );
};

export default SeatPlan;
