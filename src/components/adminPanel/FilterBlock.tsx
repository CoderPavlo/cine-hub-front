import dayjs, { Dayjs } from 'dayjs'
import { useEffect, useState } from 'react'
import { Cinema, Hall } from '../../models/tables'
import { Paper, Typography, Grid2, Autocomplete, TextField, Skeleton } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import serverAPI from '../../store/api/server'
import { useSearchParams } from 'react-router-dom'

export interface Filter {
    cinema: Cinema | null,
    hall: Hall | null,
    date: Dayjs | null,
}

interface FilterBlock {
    filter: Filter,
    setFilter: (filter: Filter)=>void,
}
const FilterBlock = ({ filter, setFilter }: FilterBlock) => {
    const { data: cinemas, isLoading: cinemasLoading } = serverAPI.useFetchCinemasQuery({ page: 1, itemsPerPage: 10000 });
    const { data: halls, isLoading: hallsLoading } = serverAPI.useFetchHallsQuery({ page: 1, itemsPerPage: 10000, cinemaId: filter.cinema?.id });
    const [firstRender, setFirstRender] = useState(true);
    const [searchParams] = useSearchParams();
    useEffect(() => {
        if (cinemas && halls && firstRender) {
            setFilter({
                cinema: cinemas.results.find(item => item.id === searchParams.get('cinemaId')) || null,
                hall: halls.results.find(item => item.id === searchParams.get('hallId')) || null,
                date: searchParams.get('date') ? dayjs(searchParams.get('date')) : null,
            });
            setFirstRender(false);
        }
    }, [cinemas, halls]);
    return (
        <Paper sx={{ py: 2, px: 4, mb: 2 }}>
            <Typography variant="h6">Filters</Typography>
            <Grid2 container spacing={2} mt={2}>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    {cinemasLoading || firstRender ?
                        <Skeleton variant="rectangular" width='100%' height={56} /> :
                        <Autocomplete
                            value={filter.cinema}
                            onChange={(event, newValue) => setFilter({ ...filter, cinema: newValue, hall: null })}
                            options={cinemas ? cinemas.results : [] as Cinema[]}
                            getOptionLabel={(option) => option.location}
                            renderInput={(params) => <TextField {...params}
                                label="Cinema" />}
                            noOptionsText='There are no cinema'
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                    }

                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    {hallsLoading || firstRender ?
                        <Skeleton variant="rectangular" width='100%' height={56} /> :
                        <Autocomplete
                            disabled={filter.cinema === null}
                            value={filter.hall}
                            onChange={(event, newValue) => setFilter({ ...filter, hall: newValue })}
                            options={halls ? halls.results : [] as Hall[]}
                            getOptionLabel={(option) => option.name}
                            renderInput={(params) => <TextField {...params}
                                label="Hall" />}
                            noOptionsText='There are no halls'
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                        />
                    }
                </Grid2>
                <Grid2 size={{ xs: 12, md: 4 }}>
                    {firstRender ?
                        <Skeleton variant="rectangular" width='100%' height={56} /> :
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
                    }
                </Grid2>
            </Grid2>
        </Paper>
    )
}

export default FilterBlock