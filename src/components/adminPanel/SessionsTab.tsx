import { Box, Button, Grid2, Typography } from "@mui/material"
import { Session } from "../../models/tables";
import { useState } from "react";
import dayjs from "dayjs";
import DeleteDialog from "./DeleteDialog";
import SessionDialog from "./SessionDialog";
import FilterBlock, { Filter } from "./FilterBlock";
import SheduleForm from "./SheduleForm";
import serverAPI from "../../store/api/server";
import { PaginationProps } from "../../models/api";
import AdminTable from "./AdminTable";

const SessionsTab = () => {
    const [open, setOpen] = useState(false);
    const [deleteSession, setDeleteSession] = useState<Session>();
    const [session, setSession] = useState<Session>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setSession(undefined), 200);
    }
    const [filter, setFilter] = useState<{ values: Filter, pagination: PaginationProps }>({ values: { cinema: null, hall: null, date: null }, pagination: { page: 1, itemsPerPage: 10 } });
    const {data, isFetching, error, refetch} = serverAPI.useFetchSessionsQuery({
        ...filter.pagination, 
        cinemaId: filter.values.cinema ? filter.values.cinema.id : undefined,
        hallId: filter.values.hall ? filter.values.hall.id : undefined,
        date: filter.values.date ? filter.values.date.toISOString() : undefined,
    });
    const [deleteQuery, { isLoading: deleteLoading, error: deleteError }] = serverAPI.useDeleteSessionMutation();
    return (
        <Grid2 container px={{ md: '24px' }} columnSpacing={2}>
            <Grid2 size={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4">Session Management</Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Session</Button>
                </Box>
                <FilterBlock filter={filter.values} setFilter={(values) => setFilter(prev => ({ values, pagination: { ...prev.pagination, page: 1 } }))} />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }} >
                <AdminTable
                    data={data}
                    columns={['Film', 'Format Type', 'Price', 'Date', 'Time', 'Cinema', 'Hall']}
                    values={item => [item.filmName, item.formatType, item.price, dayjs(item.startTime).format('ddd DD MMM'), 
                        `${dayjs(item.startTime).format('HH:mm')} - ${dayjs(item.endTime).format('HH:mm')}`,
                        item.cinemaLocation, item.auditoriumName
                    ]}
                    filter={filter.pagination}
                    onFilterChange={(name, value) => setFilter(prev => ({
                        values: prev.values,
                        pagination: {
                            ...prev.pagination,
                            page: 1,
                            [name]: value
                        }
                    }))}
                    loading={isFetching}
                    error={Boolean(error)}
                    editOnClick={(item) => { setSession(item); setOpen(true) }}
                    deleteOnClick={(item) => setDeleteSession(item)}
                    refetch={refetch}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
                <SheduleForm filter={filter.values} />
            </Grid2>
            <SessionDialog open={open} onClose={handleClose} session={session} filter={filter.values} />
            <DeleteDialog open={deleteSession != undefined} onClose={() => setDeleteSession(undefined)}
                type='session' name={`Film: ${deleteSession?.filmName}\nCinema: ${deleteSession?.cinemaLocation}\nHall: ${deleteSession?.auditoriumName}\nDate: ${dayjs(deleteSession?.startTime).format('ddd DD MMM HH:mm')}`}
                onClick={async () => {
                    await deleteQuery(deleteSession?.id || '').then(() => {
                        if (deleteError === undefined) setDeleteSession(undefined);
                    })
                }}
                loading={deleteLoading} error={deleteError}
           />
        </Grid2>
    )
}

export default SessionsTab