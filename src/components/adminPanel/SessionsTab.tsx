import { Box, Button, Grid2, IconButton, Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip, Typography } from "@mui/material"
import { Cinema, Hall, Session } from "../../models/tables";
import { useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import dayjs from "dayjs";
import DeleteDialog from "./DeleteDialog";
import SessionDialog from "./SessionDialog";
import FilterBlock, { Filter } from "./FilterBlock";
import SheduleForm from "./SheduleForm";
import { useSearchParams } from "react-router-dom";
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
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [deleteSession, setDeleteSession] = useState<Session>();
    const [session, setSession] = useState<Session>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setSession(undefined), 200);
    }
    const [searchParams] = useSearchParams();
    const initialFilter: Filter = {
        cinema: cinemas.find(item=>item.id===searchParams.get('cinemaId')) || null,
        hall: halls.find(item=>item.id===searchParams.get('hallId')) || null,
        date: searchParams.get('date') ? dayjs(searchParams.get('date')) : null,
    }
    const [filter, setFilter] = useState<Filter>(initialFilter);
    return (
        <Grid2 container px='24px' columnSpacing={2}>
            <Grid2 size={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4">Session Management</Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Session</Button>
                </Box>
                <FilterBlock filter={filter} setFilter={setFilter}/>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 8 }} >
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Id</TableCell>
                                <TableCell>Film</TableCell>
                                <TableCell>Format Type</TableCell>
                                <TableCell>Price</TableCell>
                                <TableCell>Date</TableCell>
                                <TableCell>Time</TableCell>
                                <TableCell>Cinema</TableCell>
                                <TableCell>Hall</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {data.map((item, index) => (
                                <TableRow key={index}>
                                    <TableCell>{item.id}</TableCell>
                                    <TableCell>{item.filmName}</TableCell>
                                    <TableCell>{item.formatType}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>{dayjs(item.startTime).format('ddd DD MMM')}</TableCell>
                                    <TableCell>
                                        {`${dayjs(item.startTime).format('HH:mm')} - ${dayjs(item.endTime).format('HH:mm')}`}
                                    </TableCell>
                                    <TableCell>{item.hall.cinema.location}</TableCell>
                                    <TableCell>{item.hall.name}</TableCell>
                                    <TableCell>
                                        <Tooltip title="Edit">
                                            <IconButton color="primary" size="small" onClick={() => { setSession(item); setOpen(true) }}>
                                                <Edit />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title="Delete">
                                            <IconButton color="error" size="small" onClick={() => setDeleteSession(item)} sx={{ ml: 1 }}>
                                                <Delete />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                {/* {data && data.total_pages > 1 && */}
                <Pagination count={10} variant="outlined" color="primary" page={page} onChange={(e, page) => setPage(page)}
                    size='large'
                    sx={{
                        paddingBlock: 2,
                        display: 'flex',
                        justifyContent: 'center'
                    }}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
                <SheduleForm filter={filter}/>
            </Grid2>
            <SessionDialog open={open} onClose={handleClose} session={session} filter={filter} />
            <DeleteDialog open={deleteSession != undefined} onClose={() => setDeleteSession(undefined)} onClick={() => setDeleteSession(undefined)}
                type='session' name={`Film: ${deleteSession?.filmName}\nCinema: ${deleteSession?.hall.cinema.location}\nHall: ${deleteSession?.hall.name}\nDate: ${dayjs(deleteSession?.startTime).format('ddd DD MMM HH:mm')}`}
            />
        </Grid2>
    )
}

export default SessionsTab