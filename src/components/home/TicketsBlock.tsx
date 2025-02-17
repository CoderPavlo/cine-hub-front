import { Typography, Box, Button, Grid2 } from '@mui/material';
import { useState } from 'react'
import TicketCard from '../tickets/TicketCard';
import { Ticket } from '../../models/tickets';
import TicketDialog from '../tickets/TicketDialog';
import TicketCardSkeleton from '../tickets/TicketCardSkeleton';
import { useNavigate } from 'react-router-dom';
import serverAPI from '../../store/api/server';
import LoadingComponent from '../common/LoadingComponent';


export default function TicketsBlock() {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const navigate = useNavigate();
    const { data, isFetching, error, refetch } = serverAPI.useFetchTicketsQuery({ page: 1, itemsPerPage: 3 });

    return (
        <>
            <Typography variant="h5" gutterBottom color="textPrimary">
                Your Tickets
            </Typography>
            <Grid2 container spacing={3}>
                <LoadingComponent loading={isFetching} error={Boolean(error)} refetch={refetch}
                    height='184px'
                    skeleton={[...Array(3)].map((item, index) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                            <TicketCardSkeleton />
                        </Grid2>
                    ))}
                >
                    {data && data.results.map((ticket, index) => (
                        <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={ticket.id}>
                            <TicketCard ticket={ticket} onClick={() => setSelectedTicket(ticket)} />
                        </Grid2>
                    ))}
                </LoadingComponent>
            </Grid2>
            {data && data.results.length===0 && <Typography variant='h4' textAlign='center'>No tickets purchased</Typography>}
            <Box my={2} display='flex' justifyContent='center'>
                <Button variant="outlined" onClick={() => navigate('/tickets')}>View all</Button>
            </Box>
            <TicketDialog ticket={selectedTicket != null ? selectedTicket : undefined} onClose={() => setSelectedTicket(null)} open={selectedTicket != null} />

        </>
    )
}
