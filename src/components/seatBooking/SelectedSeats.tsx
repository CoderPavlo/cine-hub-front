import { Box, Button, IconButton, Stack, Typography } from "@mui/material";
import { Seat, SeatBookingInfo } from "../../pages/seatBooking/SeatBookingPage";
import { useTheme } from "@emotion/react";
import ClearIcon from "@mui/icons-material/Clear";

function SelectedSeats({
  selectedSeats,
  handleDeleteTicketClick,
  handleBookingTicketClick,
}: {
  selectedSeats: Seat[];
  handleDeleteTicketClick: (seat: Seat) => void;
  handleBookingTicketClick: (seat: SeatBookingInfo) => void;
}) {
  const theme = useTheme();

  return selectedSeats.length > 0 ? (
    <Box sx={{ p: 2, mt: 2 }}>
      <Stack
        spacing={3}
        sx={{
          maxHeight: { xs: "auto", md: "calc(100vh - 315px)" },
          overflowY: "scroll",
          scrollbarWidth: "thin",
          "& > :last-child": {
            mb: "15px !important",
          },
        }}
      >
        {selectedSeats.map((seat) => (
          <Box
            key={seat.id}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              border: "1px solid transparent",
              borderColor:
                seat.type === "lux"
                  ? "primary.main"
                  : theme.palette.mode === "light"
                  ? "#000000"
                  : "#ffffff",
              padding: "8px 15px",
              borderRadius: "8px",
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                flexGrow: 1,
                justifyContent: "space-between",
                alignItems: "center",
                gap: "30px",
                flexWrap: "wrap",
              }}
            >
              <Box>
                <Typography variant="caption">Row</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {seat.row}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">Place</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {seat.place} <span>&mdash;</span> {seat.type.toUpperCase()}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">Price</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {seat.price} UAH
                </Typography>
              </Box>
            </Box>
            <Box>
              <IconButton
                onClick={() => handleDeleteTicketClick(seat)}
                sx={{
                  bgcolor:
                    theme.palette.mode === "light" ? "grey.300" : "grey.700",
                  padding: "4px",
                  color: theme.palette.mode === "light" ? "black" : "white",
                  "&:hover": {
                    bgcolor:
                      theme.palette.mode === "light" ? "grey.400" : "grey.500",
                  },
                }}
              >
                <ClearIcon />
              </IconButton>
            </Box>
          </Box>
        ))}
      </Stack>

      <Typography
        variant="h6"
        sx={{ mt: 1, fontWeight: 600, textAlign: "center" }}
      >
        Total:{" "}
        <span style={{ color: "#b02e2f" }}>
          {selectedSeats.reduce((sum, seat) => sum + seat.price, 0)} UAH
        </span>
      </Typography>

      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, width: "100%", fontWeight: 600 }}
        onClick={handleBookingTicketClick}
      >
        Proceed to Payment
      </Button>
    </Box>
  ) : (
    ""
  );
}

export default SelectedSeats;
