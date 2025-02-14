import { Box, Typography, Button, Paper, TableCell, Autocomplete, TextField, Container } from '@mui/material'
import { useState } from 'react'
import { Cinema, Hall } from '../../models/tables';
import DeleteDialog from './DeleteDialog';
import HallDialog from './HallDialog';
import serverAPI from '../../store/api/server';
import { PaginationProps } from '../../models/api';
import AdminTable from './AdminTable';

export default function HallsTab() {
    const [open, setOpen] = useState(false);
    const [deleteHall, setDeleteHall] = useState<Hall>();
    const [hall, setHall] = useState<Hall>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setHall(undefined), 200);
    }
    const [filter, setFilter] = useState<Cinema | null>(null);
    const { data: cinemas, isLoading } = serverAPI.useFetchCinemasQuery({ page: 1, itemsPerPage: 10000 });
    const [pagination, setPagination] = useState<PaginationProps>({ page: 1, itemsPerPage: 10 });
    const { data, isFetching, error, refetch } = serverAPI.useFetchHallsQuery({ ...pagination, cinemaId: filter ? filter.id : undefined })
    const [deleteQuery, { isLoading: deleteLoading, error: deleteError }] = serverAPI.useDeleteHallMutation();
    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Hall Management</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Hall</Button>
            </Box>
            <Paper sx={{ display: "flex", flexDirection: 'column', mb: 2, py: 2, px: 4 }}>
                <Typography variant="h6">Filters</Typography>
                <Autocomplete
                    value={filter}
                    onChange={(event, newValue) => setFilter(newValue)}
                    options={cinemas ? cinemas.results : [] as Cinema[]}
                    getOptionLabel={(option) => option.location}
                    renderInput={(params) => <TextField {...params}
                        label="Cinema" />}
                    noOptionsText='There are no cinema'
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{ mt: 2 }}
                    loading={isLoading}
                />
            </Paper>
            <AdminTable
                data={data}
                columns={['Name', 'Row Count', 'Seats Per Row', 'Cinema']}
                values={item => [item.name, item.rowCount, item.seatsPerRow, item.cinemaName]}
                filter={pagination}
                onFilterChange={(name, value) => setPagination({ ...pagination, page: 1, [name]: value })}
                loading={isFetching}
                error={Boolean(error)}
                editOnClick={(item) => { setHall(item); setOpen(true) }}
                deleteOnClick={(item) => setDeleteHall(item)}
                refetch={refetch}
            />
            <HallDialog open={open} onClose={handleClose} hall={hall} />
            <DeleteDialog open={deleteHall != undefined} onClose={() => setDeleteHall(undefined)}
                type='hall' name={`Name: ${deleteHall?.name}\nCinema: ${deleteHall?.cinemaName}`}
                onClick={async () => {
                    await deleteQuery(deleteHall?.id || '').then(() => {
                        if (deleteError === undefined) setDeleteHall(undefined);
                    })
                }}
                loading={deleteLoading} error={deleteError}
            />
        </Container>
    )
}
