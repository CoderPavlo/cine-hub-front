import { Alert, Autocomplete, Box, Button, Chip, Grid2, IconButton, Pagination, Paper, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tabs, TextField, Tooltip, Typography } from "@mui/material"
import { Cinema, Hall, Session } from "../../models/tables";
import { useEffect, useMemo, useState } from "react";
import { Edit, Delete } from "@mui/icons-material";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from "dayjs";
import duration from 'dayjs/plugin/duration';
import DeleteDialog from "./DeleteDialog";
import SessionDialog from "./SessionDialog";

dayjs.extend(duration);
const IntervalAlert = ({ start, end }: { start: Dayjs, end: Dayjs }) => {
    const diff = dayjs.duration(end.diff(start));
    const hours = `${diff.hours()} hour${diff.hours() !== 1 ? 's' : ''} `;
    const minutes = `${diff.minutes()} minute${diff.minutes() !== 1 ? 's' : ''}`;
    const diffInMinutes = end.diff(start, 'minute');
    return (
        <>
            {diffInMinutes >= 30 &&
                <Alert severity="warning">{`No sessions scheduled for ${diff.hours() > 0 ? hours : ''}${diff.minutes() > 0 ? minutes : ''}`}</Alert>
            }
        </>
    );
}
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

const generateDateArray = (date: Dayjs | null): Dayjs[] => {
    const today = dayjs().startOf('day');
    const baseDate = date && date.isAfter(today, 'day') ? date : today;
    const pastDays = Math.min(6, baseDate.diff(today, 'day'));
    return Array.from({ length: 14 }, (_, i) => baseDate.subtract(pastDays, 'day').add(i, 'day'));
};


const SessionsTab = () => {
    const data: Session[] = [
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
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [deleteSession, setDeleteSession] = useState<Session>();
    const [session, setSession] = useState<Session>();
    const handleClose = () => {
        setOpen(false);
        setTimeout(() => setSession(undefined), 200);
    }
    const [filter, setFilter] = useState<{
        cinema: Cinema | null,
        hall: Hall | null,
        date: Dayjs | null,
    }>({
        cinema: null,
        hall: null,
        date: null,
    });
    const dateList = useMemo(() => generateDateArray(filter.date), [filter.date]);
    useEffect(() => {
        const index = filter.date === null ? 0 : dateList.findIndex(item => item.isSame(filter.date));
        setSelectedDate(index);
    }, [filter.date]);
    const [selectedDate, setSelectedDate] = useState(0);
    return (
        <Grid2 container px='24px' columnSpacing={2}>
            <Grid2 size={12}>
                <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                    <Typography variant="h4">Session Management</Typography>
                    <Button variant="contained" color="primary" onClick={() => setOpen(true)}>Add New Session</Button>
                </Box>
                <Paper sx={{ py: 2, px: 4, mb: 2 }}>
                    <Typography variant="h6">Filters</Typography>
                    <Grid2 container spacing={2} mt={2}>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Autocomplete
                                value={filter.cinema}
                                onChange={(event, newValue) => setFilter({ ...filter, cinema: newValue })}
                                options={cinemas}
                                getOptionLabel={(option) => option.location}
                                renderInput={(params) => <TextField {...params}
                                    label="Cinema" />}
                                noOptionsText='There are no cinema'
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <Autocomplete
                                disabled={filter.cinema === null}
                                value={filter.hall}
                                onChange={(event, newValue) => setFilter({ ...filter, hall: newValue })}
                                options={halls}
                                getOptionLabel={(option) => option.name}
                                renderInput={(params) => <TextField {...params}
                                    label="Hall" />}
                                noOptionsText='There are no halls'
                                isOptionEqualToValue={(option, value) => option.id === value.id}
                            />
                        </Grid2>
                        <Grid2 size={{ xs: 12, md: 4 }}>
                            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                                <DatePicker
                                    label='Date'
                                    value={filter.date}
                                    onChange={(value) => setFilter({ ...filter, date: value })}
                                    views={['year', 'month', 'day']}
                                    format="DD.MM.YYYY"
                                    shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')}
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                        },
                                        toolbar: { toolbarFormat: 'ddd DD MMM', hidden: false },
                                    }}
                                />
                            </LocalizationProvider>
                        </Grid2>
                    </Grid2>
                </Paper>
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
                <Paper
                    sx={{
                        p: 2,
                        position: { xs: "relative", lg: "sticky" },
                        top: { xs: "auto", lg: 88 },
                        bgcolor: "background.paper",
                        borderRadius: 2,
                        boxShadow: 3,
                    }}
                >
                    {(filter.cinema === null || filter.hall === null) ?
                        <Typography color='error' variant='h6' textAlign='center'>You need select a cinema and a hall</Typography> :
                        <>
                            <Tabs
                                value={selectedDate}
                                onChange={(e, newValue) => setSelectedDate(newValue)}
                                variant="scrollable"
                                scrollButtons="auto"
                                sx={{
                                    mb: 3,
                                    ".MuiTabs-scrollButtons.Mui-disabled": {
                                        opacity: 0.3,
                                    },
                                    ".MuiTabs-scrollButtons": {
                                        color: "#b02e2f",
                                        width: "10px",
                                    },
                                    "& .MuiTabs-scroller": {
                                        mx: "10px",
                                    },
                                }}
                            >
                                {dateList.map((date, index) => (
                                    <Tab
                                        key={index}
                                        label={date.format('ddd DD MMM')}
                                        sx={{ textTransform: "capitalize" }}
                                    />
                                ))}
                            </Tabs>
                            <Box display='flex' flexDirection='column' gap={1}>
                                
                                {data.length > 0 ?
                                    <>
                                    {dayjs(data[0].startTime).startOf('day').isSame(dateList[selectedDate].startOf('day')) &&
                                    <IntervalAlert start={dateList[selectedDate].set('hour', 0).set('minute', 0)} end={dayjs(data[0].startTime)} />
                                    }
                                    </>
                                    :
                                    <IntervalAlert start={dateList[selectedDate].set('hour', 0).set('minute', 0)} end={dateList[selectedDate].set('hour', 23).set('minute', 59)} />

                                }
                                {data.map((item, index) =>
                                    <>
                                        <Box display='flex' flexDirection='row' alignItems='center' gap={1}>
                                            <Chip
                                                key={index}
                                                label={`${dayjs(item.startTime).format('HH:mm')} - ${dayjs(item.endTime).format('HH:mm')}`}
                                                variant="outlined"
                                                component="div"
                                                color="primary"
                                                sx={{
                                                    borderRadius: "8px",
                                                    borderColor: "primary.main",
                                                }}
                                            />
                                            <Typography variant="body1">{item.filmName}</Typography>
                                        </Box>
                                        {index !== data.length - 1 &&
                                            <IntervalAlert start={dayjs(item.endTime)} end={dayjs(data[index + 1].startTime)} />
                                        }
                                    </>
                                )}
                                {data.length > 0 && dayjs(data[data.length - 1].endTime).startOf('day').isSame(dateList[selectedDate].startOf('day')) && <IntervalAlert start={dayjs(data[data.length - 1].endTime)} end={dateList[selectedDate].set('hour', 23).set('minute', 59)} />}
                            </Box>
                        </>
                    }
                </Paper>
            </Grid2>
            <SessionDialog open={open} onClose={handleClose} session={session} filter={filter} />
            <DeleteDialog open={deleteSession != undefined} onClose={() => setDeleteSession(undefined)} onClick={() => setDeleteSession(undefined)}
                type='session' name={`Film: ${deleteSession?.filmName}\nCinema: ${deleteSession?.hall.cinema.location}\nHall: ${deleteSession?.hall.name}\nDate: ${dayjs(deleteSession?.startTime).format('ddd DD MMM HH:mm')}`}
            />
        </Grid2>
    )
}

export default SessionsTab