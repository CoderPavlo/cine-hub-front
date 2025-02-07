import { Delete, Edit } from '@mui/icons-material';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Pagination, Tooltip, Autocomplete, TextField, Container } from '@mui/material'
import { useState } from 'react'
import { Cinema, Hall } from '../../models/tables';
import DeleteDialog from './DeleteDialog';
import HallDialog from './HallDialog';

export default function HallsTab() {
    const data: Hall[] = [
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

    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [deleteHall, setDeleteHall] = useState<Hall>();
    const [hall, setHall] = useState<Hall>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setHall(undefined), 200);
    }
    const [filter, setFilter] = useState<Cinema | null>(null);
    const cinemas: Cinema[] = [
        { id: '1', location: 'Kyiv, Ocean Plaza' }
    ];
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
                    options={cinemas}
                    getOptionLabel={(option) => option.location}
                    renderInput={(params) => <TextField {...params}
                        label="Cinema" />}
                    noOptionsText='There are no cinema'
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    sx={{mt:2}}
                />
            </Paper>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Name</TableCell>
                            <TableCell>Row Count</TableCell>
                            <TableCell>Seats Per Row</TableCell>
                            <TableCell>Cinema</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.rowCount}</TableCell>
                                <TableCell>{item.seatsPerRow}</TableCell>
                                <TableCell>{item.cinema.location}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton color="primary" size="small" onClick={() => { setHall(item); setOpen(true) }}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="error" size="small" onClick={() => setDeleteHall(item)} sx={{ ml: 1 }}>
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
            {/* } */}
            <HallDialog open={open} onClose={handleClose} hall={hall} />
            <DeleteDialog open={deleteHall != undefined} onClose={() => setDeleteHall(undefined)} onClick={() => setDeleteHall(undefined)}
                type='hall' name={`Name: ${deleteHall?.name}\nCinema: ${deleteHall?.cinema.location}`}
            />
        </Container>
    )
}
