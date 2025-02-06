import { Ticket } from '../../models/tickets'
import { Download, Share } from '@mui/icons-material'
import { CardContent, Typography, Box, Tooltip, IconButton, useTheme, Badge, BadgeProps, styled } from '@mui/material'
import { QRCodeSVG } from 'qrcode.react'
import { StyledCard } from '../home/MovieCard'

export const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
  '& .MuiBadge-badge': {
      right: 25,
      top: 20,
      border: `2px solid ${theme.palette.background.paper}`,
  },
}));

interface TicketCardProps {
  ticket: Ticket,
  onClick: () => void,
}
export default function TicketCard({ ticket, onClick }: TicketCardProps) {
  const theme = useTheme();
  return (
    <button style={{ padding: 0, border: 'none', background: 'transparent', width: '100%', cursor: 'pointer' }} onClick={onClick}>
      <StyledCard>
        <StyledBadge badgeContent={ticket.type} color="primary">
          <CardContent sx={{ width: '100%' }}>
            <Typography variant="h5">{ticket.title}</Typography>
            <Typography variant="body1" color="textSecondary">
              {ticket.date} at {ticket.time}
            </Typography>
            <Typography variant="body1">
              Hall: {ticket.hall}, Row: {ticket.row_number}, Seat: {ticket.seat_number}
            </Typography>
            <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
              <QRCodeSVG value={ticket.id} size={64} bgColor={theme.palette.background.paper} fgColor={theme.palette.text.primary} />
              <Box gap={1}>
                <Tooltip title="Download ticket">
                  <IconButton>
                    <Download />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Share ticket">
                  <IconButton>
                    <Share />
                  </IconButton>
                </Tooltip>
              </Box>
              <Box display="flex" alignItems='end' flex={1}>
                <Typography variant="h5" color="textSecondary" flex={1} textAlign="end">
                  ${ticket.price}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </StyledBadge>

      </StyledCard>
    </button>
  )
}
