import { Typography, Grid2, Container, Pagination } from "@mui/material";
import { useState } from "react";
import TicketCard from "../components/tickets/TicketCard";
import TicketDialog from "../components/tickets/TicketDialog";
import { Ticket } from "../models/tickets";
import serverAPI from "../store/api/server";
import LoadingComponent from "../components/common/LoadingComponent";
import TicketCardSkeleton from "../components/tickets/TicketCardSkeleton";

const TicketPage = () => {
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [page, setPage] = useState(1);
    const { data, isFetching, error, refetch } = serverAPI.useFetchTicketsQuery({ page: page, itemsPerPage: 9 });

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
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
            {data && data.results.length === 0 && <Typography variant='h4' textAlign='center'>No tickets purchased</Typography>}
            {data && data.total_pages > 1 &&
                <Pagination count={data.total_pages} variant="outlined" color="primary" page={page} onChange={(e, page) => setPage(page)}
                    size='large'
                    sx={{
                        paddingBlock: 2,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
            }
            <TicketDialog ticket={selectedTicket != null ? selectedTicket : undefined} onClose={() => setSelectedTicket(null)} open={selectedTicket != null} />

        </Container>
    )
}

export default TicketPage