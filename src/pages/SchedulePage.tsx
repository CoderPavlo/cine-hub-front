import { Autocomplete, Container, Grid2, List, ListItem, Skeleton, TextField, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material"
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import { useState } from "react";
import SessionButton from "../components/sessions/SessionButton";
import SessionsCard from "../components/sessions/SessionsCard";
import { Cinema, Session } from "../models/tables";
import serverAPI from "../store/api/server";
import LoadingComponent from "../components/common/LoadingComponent";
import SessionCardSkeleton from "../components/sessions/SessionCardSkeleton";


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

const SchedulePage = () => {
    const [date, setDate] = useState(dayjs());
    const [tab, setTab] = useState(0);
    const [cinema, setCinema] = useState<Cinema | null>(null);
    const { data: cinemas, isLoading } = serverAPI.useFetchCinemasQuery({ page: 1, itemsPerPage: 10000 });
    const { data, isFetching, error, refetch } = serverAPI.useFetchSessionsQuery({ page: 1, itemsPerPage: 10000, cinemaId: cinema ? cinema.id : undefined, date: date.toISOString() })
    return (
        <Grid2 container px={{ md: '24px' }} spacing={3} my={4}>
            <Grid2 size={{ xs: 12, md: 4 }}>
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
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
                <Autocomplete
                    value={cinema}
                    onChange={(event, newValue) => setCinema(newValue)}
                    options={cinemas ? cinemas.results : [] as Cinema[]}
                    getOptionLabel={(option) => option.location}
                    renderInput={(params) => <TextField {...params}
                        label="Cinema" />}
                    noOptionsText='There are no cinema'
                    isOptionEqualToValue={(option, value) => option.id === value.id}
                    loading={isLoading}
                />
            </Grid2>
            <Grid2 size={{ xs: 12, md: 4 }}>
                <ToggleButtonGroup
                    color="primary"
                    value={tab}
                    exclusive
                    onChange={(e, value) => { if (value !== null) setTab(value) }}
                    aria-label="Platform"
                    sx={{ width: '100%', marginTop: "5px", marginBottom: "5px", ml: 1 }}
                >
                    <ToggleButton value={0} sx={{ width: '50%' }}>
                        Films
                    </ToggleButton>
                    <ToggleButton value={1} sx={{ width: '50%' }}>
                        Session
                    </ToggleButton>
                </ToggleButtonGroup>
            </Grid2>
            {data && data.results.length === 0 &&
                <Grid2 size={12}>
                    <Typography variant="h4" textAlign='center'>
                        No sessions scheduled yet
                    </Typography>
                </Grid2>
            }
            {tab === 0 &&
                <LoadingComponent loading={isFetching} error={Boolean(error)} refetch={refetch}
                    skeleton={[...Array(4)].map((item, index) => (
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <SessionCardSkeleton />
                        </Grid2>
                    ))} height='324px'
                >
                    {data && groupSessionsByFilm(data.results).map(item =>
                        <Grid2 size={{ xs: 12, md: 6 }}>
                            <SessionsCard item={item} />
                        </Grid2>
                    )}
                </LoadingComponent>
            }
            {tab === 1 &&
                <Grid2 size={12}>
                    <LoadingComponent loading={isFetching} error={Boolean(error)} refetch={refetch}
                        skeleton={
                            [...Array(5)].map((item, index) => (
                                <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }}>
                                    <ListItem divider><Skeleton height='97px' width='100%' /></ListItem>
                                </List>
                            ))
                        } height='324px'
                    >
                        {data && data.results.map(item =>
                            <List sx={{ p: 0, '& .MuiListItemButton-root': { py: 2 } }} key={item.id}>
                                <SessionButton item={item} />
                            </List>
                        )}
                    </LoadingComponent>
                </Grid2>
            }
        </Grid2>
    )
}

export default SchedulePage