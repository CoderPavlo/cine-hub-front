import { Typography, CardContent, Box, Tooltip, IconButton, styled, useTheme, Badge, BadgeProps, Button, Stack, Dialog, DialogContent, DialogTitle, Grid2 } from '@mui/material';
import { useState } from 'react'
import { QRCodeSVG } from "qrcode.react";
import { Close, Download, Share } from '@mui/icons-material';
import { StyledCard } from './MovieCard';

const StyledBadge = styled(Badge)<BadgeProps>(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: 25,
        top: 20,
        border: `2px solid ${theme.palette.background.paper}`,
    },
}));

export default function TicketsBlock() {
    const theme = useTheme();
    const tickets = [
        {
            id: '5c520f03-5e49-4ac3-a247-e5f4db1490b9',
            title: "Inception",
            date: "20-02-2025",
            time: "19:30",
            row_number: 1,
            seat_number: 2,
            type: '2D',
            hall: 1,
            price: 100,
        },
        {
            id: '68621b1c-695a-4e8d-8a47-9d27299487aa',
            title: "The Dark Knight",
            date: "22-02-2025",
            time: "20:00",
            row_number: 1,
            seat_number: 2,
            type: '3D',
            hall: 1,
            price: 100,
        },
        {
            id: '5c520f03-5e49-4ac3-a247-e5f4db1490b9',
            title: "Inception",
            date: "20-02-2025",
            time: "19:30",
            row_number: 1,
            seat_number: 2,
            type: '2D',
            hall: 1,
            price: 100,
        },
    ];

    const [selectedTicket, setSelectedTicket] = useState<number | null>(null);
    return (
        <>
            <Typography variant="h5" gutterBottom color="textPrimary">
                Your Tickets
            </Typography>
            <Grid2 container spacing={3}>
                {tickets.map((ticket, index) => (
                    <Grid2 size={{xs: 12, sm: 6, md: 4}} key={ticket.id}>
                        <button style={{ padding: 0, border: 'none', background: 'transparent', width: '100%', cursor: 'pointer' }} onClick={() => setSelectedTicket(index)}>
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
                                            <Box>
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
                    </Grid2>
                ))}
            </Grid2>
            <Box my={2} display='flex' justifyContent='center'>
                <Button variant="outlined">View all</Button>
            </Box>
            <Dialog
                onClose={() => setSelectedTicket(null)}
                aria-labelledby="customized-dialog-title"
                open={selectedTicket != null}
                slotProps={{
                    paper: {
                        sx: {
                            background: theme.palette.background.paper
                        }
                    }
                }}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Ticket
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={() => setSelectedTicket(null)}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <Close />
                </IconButton>
                <DialogContent dividers>
                    {selectedTicket != null &&
                        <Stack direction='row'>
                            <QRCodeSVG value={tickets[selectedTicket].id} size={300} bgColor={theme.palette.background.paper} fgColor={theme.palette.text.primary} />
                            <Stack direction='column' ml={1} textAlign='center' spacing={1}>
                                <Typography variant="h5">{tickets[selectedTicket].title}</Typography>
                                <Typography variant="body1" color="textSecondary">
                                    {tickets[selectedTicket].date} at {tickets[selectedTicket].time}
                                </Typography>
                                <Typography variant="body1">
                                    Hall: {tickets[selectedTicket].hall}, Row: {tickets[selectedTicket].row_number}, Seat: {tickets[selectedTicket].seat_number}
                                </Typography>
                                <Typography variant="body1">
                                    Type: {tickets[selectedTicket].type}
                                </Typography>
                                <Typography variant="body1" color="textSecondary">
                                    Price: ${tickets[selectedTicket].price}
                                </Typography>
                            </Stack>
                        </Stack>
                    }
                </DialogContent>
            </Dialog>
        </>
    )
}
