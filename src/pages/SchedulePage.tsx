import { Container, Grid2, List, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import SessionButton from "../components/sessions/SessionButton";
import SessionsCard from "../components/sessions/SessionsCard";

export interface Session {
    id: string,
    startTime: string,
    endTime: string,
    formatType: string,
    price: number,
    filmId: number,
    filmName: string,
    hall: string,
}

export function groupSessionsByFilm(sessions: Session[]): { filmId: number; sessions: Session[] }[] {
    const groupedMap = new Map<number, Session[]>();

    sessions.forEach(session => {
        if (!groupedMap.has(session.filmId)) {
            groupedMap.set(session.filmId, []);
        }
        groupedMap.get(session.filmId)!.push(session);
    });

    return Array.from(groupedMap.entries()).map(([filmId, sessions]) => ({
        filmId,
        sessions
    }));
}

const sessions: Session[] = [
    {
        id: "1",
        startTime: "2025-02-11T10:00:00.000Z",
        endTime: "2025-02-11T12:00:00.000Z",
        formatType: "2D",
        price: 150,
        filmId: 939243,
        filmName: "Sonic the Hedgehog 3",
        hall: "Hall 1"
    },
    {
        id: "2",
        startTime: "2025-02-11T12:30:00.000Z",
        endTime: "2025-02-11T14:30:00.000Z",
        formatType: "3D",
        price: 180,
        filmId: 1241982,
        filmName: "Moana 2",
        hall: "Hall 2"
    },
    {
        id: "3",
        startTime: "2025-02-11T15:00:00.000Z",
        endTime: "2025-02-11T17:00:00.000Z",
        formatType: "IMAX",
        price: 220,
        filmId: 539972,
        filmName: "Kraven the Hunter",
        hall: "Hall 1"
    },
    {
        id: "4",
        startTime: "2025-02-11T17:30:00.000Z",
        endTime: "2025-02-11T19:30:00.000Z",
        formatType: "2D",
        price: 160,
        filmId: 1160956,
        filmName: "Panda Plan",
        hall: "Hall 2"
    },
    {
        id: "5",
        startTime: "2025-02-11T20:00:00.000Z",
        endTime: "2025-02-11T22:00:00.000Z",
        formatType: "3D",
        price: 190,
        filmId: 710295,
        filmName: "Wolf Man",
        hall: "Hall 3"
    },
    {
        id: "6",
        startTime: "2025-02-11T22:30:00.000Z",
        endTime: "2025-02-12T00:30:00.000Z",
        formatType: "IMAX",
        price: 250,
        filmId: 939243,
        filmName: "Venom: The Last Dance",
        hall: "Hall 1"
    }
];

const SchedulePage = () => {
    const [date, setDate] = useState(dayjs());
    const [tab, setTab] = useState(0);
    return (
        <Grid2 container px={{ md: '24px' }} spacing={3} my={4}>
            <Grid2 size={12}>
                <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale='en-gb'>
                        <DatePicker
                            label='Date'
                            value={date}
                            onChange={(value) => { if (value) setDate(value) }}
                            views={['year', 'month', 'day']}
                            format="DD.MM.YYYY"
                            shouldDisableDate={(date) => date.isBefore(dayjs(), 'day')}
                            slotProps={{
                                toolbar: { toolbarFormat: 'ddd DD MMM', hidden: false },
                            }}
                        />
                    </LocalizationProvider>
                    <ToggleButtonGroup
                        color="primary"
                        value={tab}
                        exclusive
                        onChange={(e, value) => { if (value !== null) setTab(value) }}
                        aria-label="Platform"
                        sx={{ width: { xs: '50%', md: "30%" }, marginTop: "5px", marginBottom: "5px", ml: 1 }}
                    >
                        <ToggleButton value={0} sx={{ width: '50%' }}>
                            Films
                        </ToggleButton>
                        <ToggleButton value={1} sx={{ width: '50%' }}>
                            Session
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Container>
            </Grid2>
            {sessions.length === 0 &&
                <Grid2 size={12}>
                    <Typography variant="h4" textAlign='center'>
                        No sessions scheduled yet
                    </Typography>
                </Grid2>
            }
            {tab === 0 && groupSessionsByFilm(sessions).map(item =>
                <Grid2 size={{ xs: 12, md: 6 }}>
                    <SessionsCard item={item} />
                </Grid2>
            )}
            {tab === 1 &&
                <Grid2 size={12}>
                    {sessions.map(item =>
                        <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }} key={item.id}>
                            <SessionButton item={item} />
                        </List>
                    )}
                </Grid2>
            }
        </Grid2>
    )
}

export default SchedulePage