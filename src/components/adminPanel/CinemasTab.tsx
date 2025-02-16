import { Box, Typography, Button, Container } from '@mui/material'
import { useState } from 'react'
import CinemaDialog from './CinemaDialog';
import { Cinema } from '../../models/tables';
import DeleteDialog from './DeleteDialog';
import AdminTable from './AdminTable';
import { PaginationProps } from '../../models/api';
import serverAPI from '../../store/api/server';


export default function CinemasTab() {
    const [open, setOpen] = useState(false);
    const [deleteCinema, setDeleteCinema] = useState<Cinema>();
    const [cinema, setCinema] = useState<Cinema>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setCinema(undefined), 200);
    }
    const [filter, setfilter] = useState<PaginationProps>({ page: 1, itemsPerPage: 10 });
    const { data, isFetching, error, refetch } = serverAPI.useFetchCinemasQuery(filter);
    const [deleteQuery, { isLoading: deleteLoading, error: deleteError }] = serverAPI.useDeleteCinemaMutation();
    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Cinema Management</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Cinema</Button>
            </Box>
            <AdminTable
                data={data}
                columns={['Location']}
                values={item=>[item.location]}
                filter={filter}
                onFilterChange={(name, value) => setfilter({ ...filter, page: 1, [name]: value })}
                loading={isFetching}
                error={Boolean(error)}
                editOnClick={(item) => { setCinema(item); setOpen(true); }}
                deleteOnClick={(item) => setDeleteCinema(item)}
                refetch={refetch}
            />
            <CinemaDialog open={open} onClose={handleClose} cinema={cinema} />
            <DeleteDialog open={deleteCinema != undefined} onClose={() => setDeleteCinema(undefined)}
                onClick={async () => {
                    await deleteQuery(deleteCinema?.id || '').then(() => {
                        console.log(deleteError);
                        if (deleteError === undefined) setDeleteCinema(undefined);
                    })
                }}
                type='cinema' name={deleteCinema?.location} loading={deleteLoading} error={deleteError}
            />
        </Container>
    )
}
