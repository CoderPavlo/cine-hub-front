import dayjs, { Dayjs } from 'dayjs'
import React from 'react'
import { Cinema, Hall } from '../../models/tables'
import { Paper, Typography, Grid2, Autocomplete, TextField } from '@mui/material'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { cinemas, halls } from './SessionsTab'

export interface Filter {
    cinema: Cinema | null,
    hall: Hall | null,
    date: Dayjs | null,
}

interface FilterBlock {
    filter: Filter,
    setFilter: React.Dispatch<React.SetStateAction<Filter>>,
}
const FilterBlock = ({ filter, setFilter }: FilterBlock) => {
    return (
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
    )
}

export default FilterBlock