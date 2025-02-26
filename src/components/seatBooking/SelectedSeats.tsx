import { Box, Button, IconButton, Stack, Typography, useTheme } from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import { TicketSeat } from "../../models/tickets";
import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import ErrorDisplay from "../common/ErrorDisplay";

function SelectedSeats({
  selectedSeats,
  price,
  rows,
  handleDeleteTicketClick,
  handleBookingTicketClick,
  loading, error,
}: {
  price: number,
  rows: number,
  selectedSeats: TicketSeat[];
  handleDeleteTicketClick: (seat: TicketSeat) => void;
  handleBookingTicketClick: () => void;
  loading?: boolean,
  error?: FetchBaseQueryError | SerializedError,
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
        {selectedSeats.map((seat, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "20px",
              border: "1px solid transparent",
              borderColor: seat.row === rows
                  ? "primary.main"
                  : 'text.primary',
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
                  {seat.seat} <span>&mdash;</span> {seat.row===rows? 'Lux' : 'Standart'}
                </Typography>
              </Box>
              <Box>
                <Typography variant="caption">Price</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {price} $
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
        <span style={{ color: theme.palette.text.primary }}>
          {(price*selectedSeats.length).toFixed(3)} $
        </span>
      </Typography>
      <ErrorDisplay error={error} sx={{mt:1}}/>
      <Button
        variant="contained"
        size="large"
        sx={{ mt: 2, width: "100%", fontWeight: 600 }}
        onClick={handleBookingTicketClick}
        loading={loading}
      >
        Proceed to Payment
      </Button>
    </Box>
  ) : (
    ""
  );
}

export default SelectedSeats;
