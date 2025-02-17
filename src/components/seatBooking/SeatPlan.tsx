import {
  IconButton,
  Paper,
  Typography,
  Stack,
  Chip,
  Divider,
  Box,
  Tooltip,
  useTheme,
  alpha,
} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { Chair } from "@mui/icons-material";
import { TicketSeat } from "../../models/tickets";

const SeatPlan = ({
  rows,
  seats,
  price,
  reservedSeats,
  selectedSeats,
  handleSeatClick,
}: {
  rows: number,
  seats: number,
  price: number,
  reservedSeats: TicketSeat[],
  selectedSeats: TicketSeat[],
  handleSeatClick: (seat: TicketSeat) => void;
}) => {
  const theme = useTheme();

  const isReserved = (seat: TicketSeat) => reservedSeats.some(item=>item.row===seat.row && item.seat===seat.seat);
  const isSelected = (seat: TicketSeat) => selectedSeats.some(item=>item.row===seat.row && item.seat===seat.seat);

  const getSeatColor = (seat: TicketSeat) => {
    if(isReserved(seat))
      return theme.palette.secondary.main;
    if (seat.row===rows)
      return theme.palette.primary.main;
    return theme.palette.text.primary;
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
          width: `${seats * 58}px`,
          mx: "auto",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 806 21"
          fill={theme.palette.text.primary}
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
      {[...Array(rows)].map((item, row) => (
        <Box
          key={row}
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "8px",
            width: `${seats * 58}px`,
            mx: "auto",
          }}
        >
          {[...Array(seats)].map((item2, seat) => (
            <Tooltip
              arrow
              key={seat}
              title={
                <Box sx={{ textAlign: "center" }}>
                  {`Row: ${row+1}, Place: ${seat+1}`}
                  <br />
                  {`Price: `}
                  <span style={{ fontWeight: 600 }}>{price} $</span>
                </Box>
              }
            >
              <IconButton
                onClick={() => handleSeatClick({row: row+1, seat: seat+1})}
                disabled={isReserved({row: row+1, seat: seat+1})}
                sx={{
                  position: "relative",
                  boxSizing: "border-box",
                  border: "1px solid",
                  borderColor:
                    isSelected({row: row+1, seat: seat+1})
                      ? row+1===rows
                        ? theme.palette.primary.main
                        : theme.palette.text.primary
                      : "transparent",

                  "&:hover": {
                    bgcolor:
                    row+1===rows
                        ? alpha(theme.palette.primary.main, 0.3)
                        : alpha(theme.palette.text.primary, 0.3),
                  },
                  "&.Mui-disabled": {
                    color: theme.palette.secondary.main,
                  },
                }}
              >
                {isReserved({row: row+1, seat: seat+1}) && (
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
                        color:theme.palette.error.main,
                        fontSize: "1.5rem",
                      }}
                    />
                  </Box>
                )}
                <Chair
                  fontSize="large"
                  sx={{
                    fill: getSeatColor({row: row+1, seat: seat+1}),
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
        sx={{ mx: "auto", mt: 4, width: `${seats * 58}px` }}
      >
        <Divider />

        <Stack direction="row" spacing={3} justifyContent="center">
          <Chip
            icon={
              <Chair
                sx={{
                  fill: theme.palette.text.primary,
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
                    color: theme.palette.secondary.main,
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
                      color:theme.palette.error.main,
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
