import { Typography, Box, Button, Grid2 } from '@mui/material';
import { useState } from 'react'
import TicketCard from '../tickets/TicketCard';
import { Ticket } from '../../models/tickets';
import TicketDialog from '../tickets/TicketDialog';
import TicketCardSkeleton from '../tickets/TicketCardSkeleton';


export default function TicketsBlock() {
    const tickets: Ticket[] = [
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
                        <TicketCard ticket={ticket} onClick={() => setSelectedTicket(index)}/>
                    </Grid2>
                ))}
            </Grid2>
            <Box my={2} display='flex' justifyContent='center'>
                <Button variant="outlined">View all</Button>
            </Box>
            <TicketDialog ticket={selectedTicket !=null ? tickets[selectedTicket] : undefined} onClose={() => setSelectedTicket(null)} open={selectedTicket != null}/>
            
        </>
    )
}
