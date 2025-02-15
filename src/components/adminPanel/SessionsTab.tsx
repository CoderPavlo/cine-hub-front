import { Box, Button, Grid2, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { Cinema, Hall, Session } from "../../models/tables";
import { useEffect, useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import DeleteDialog from "./DeleteDialog";
import SessionDialog from "./SessionDialog";
import FilterBlock, { Filter } from "./FilterBlock";
import SheduleForm from "./SheduleForm";
import { useSearchParams } from "react-router-dom";
import serverAPI from "../../store/api/server";
import { PaginationProps } from "../../models/api";
import AdminTable from "./AdminTable";
export const cinemas: Cinema[] = [
    { id: '1', location: 'Kyiv, Ocean Plaza' }
];
export const halls: Hall[] = [
    {
        id: "101",
        name: "IMAX",
        rowCount: 12,
        seatsPerRow: 20,
        cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
    },
    {
        id: "102",
        name: "VIP Lounge",
        rowCount: 8,
        seatsPerRow: 15,
        cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
    },
    {
        id: "103",
        name: "Standard Hall 1",
        rowCount: 10,
        seatsPerRow: 18,
        cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
    },
    {
        id: "104",
        name: "Standard Hall 2",
        rowCount: 10,
        seatsPerRow: 18,
        cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
    },
    {
        id: "105",
        name: "4DX",
        rowCount: 6,
        seatsPerRow: 12,
        cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
    }
];

export const data: Session[] = [
    {
        id: "201",
        startTime: "2025-02-12T10:00:00",
        endTime: "2025-02-12T12:30:00",
        formatType: "IMAX 3D",
        price: 300,
        filmId: 1,
        filmName: "Avatar 2",
        hall: {
            id: "101",
            name: "IMAX",
            rowCount: 12,
            seatsPerRow: 20,
            cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
        },
    },
    {
        id: "202",
        startTime: "2025-02-12T13:00:00",
        endTime: "2025-02-12T15:15:00",
        formatType: "2D",
        price: 200,
        filmId: 2,
        filmName: "Dune: Part Two",
        hall: {
            id: "103",
            name: "Standard Hall 1",
            rowCount: 10,
            seatsPerRow: 18,
            cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
        },
    },

    {
        id: "204",
        startTime: "2025-02-12T19:00:00",
        endTime: "2025-02-12T21:30:00",
        formatType: "4DX",
        price: 350,
        filmId: 4,
        filmName: "John Wick 4",
        hall: {
            id: "105",
            name: "4DX",
            rowCount: 6,
            seatsPerRow: 12,
            cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
        },
    },
    {
        id: "205",
        startTime: "2025-02-12T22:00:00",
        endTime: "2025-02-13T00:30:00",
        formatType: "IMAX 2D",
        price: 280,
        filmId: 5,
        filmName: "The Batman",
        hall: {
            id: "101",
            name: "IMAX",
            rowCount: 12,
            seatsPerRow: 20,
            cinema: { id: "1", location: "Kyiv, Ocean Plaza" },
        },
    },
];

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
            <DeleteDialog open={deleteSession != undefined} onClose={() => setDeleteSession(undefined)} onClick={() => setDeleteSession(undefined)}
                type='session' name={`Film: ${deleteSession?.filmName}\nCinema: ${deleteSession?.cinemaLocation}\nHall: ${deleteSession?.auditoriumName}\nDate: ${dayjs(deleteSession?.startTime).format('ddd DD MMM HH:mm')}`}
            />
        </Grid2>
    )
}

export default SessionsTab