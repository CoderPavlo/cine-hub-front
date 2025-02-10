import { Delete, Edit } from '@mui/icons-material';
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, IconButton, Pagination, Tooltip, Container } from '@mui/material'
import { useState } from 'react'
import CinemaDialog from './CinemaDialog';
import { Cinema } from '../../models/tables';
import DeleteDialog from './DeleteDialog';


export default function CinemasTab() {
    const data: Cinema[] = [
        { id: '1', location: 'Kyiv, Ocean Plaza' }
    ];
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [deleteCinema, setDeleteCinema] = useState<Cinema>();
    const [cinema, setCinema] = useState<Cinema>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setCinema(undefined), 200);
    }
    return (
        <Container maxWidth="lg">
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                <Typography variant="h4">Cinema Management</Typography>
                <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Cinema</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.location}</TableCell>
                                <TableCell>
                                    <Tooltip title="Edit">
                                        <IconButton color="primary" size="small" onClick={() => { setCinema(item); setOpen(true) }}>
                                            <Edit />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton color="error" size="small" onClick={() => setDeleteCinema(item)} sx={{ ml: 1 }}>
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
            <CinemaDialog open={open} onClose={handleClose} cinema={cinema} />
            <DeleteDialog open={deleteCinema != undefined} onClose={() => setDeleteCinema(undefined)} onClick={() => setDeleteCinema(undefined)}
                type='cinema' name={deleteCinema?.location}
            />
        </Container>
    )
}
