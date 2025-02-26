import { useEffect, useMemo, useState } from 'react'
import { Filter } from './FilterBlock';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Alert, Box, Button, Chip, Paper, Tab, Tabs, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import serverAPI from '../../store/api/server';
dayjs.extend(duration);
const generateDateArray = (date: Dayjs | null): Dayjs[] => {
    const today = dayjs().startOf('day');
    const baseDate = date && date.isAfter(today, 'day') ? date : today;
    const pastDays = Math.min(6, baseDate.diff(today, 'day'));
    return Array.from({ length: 14 }, (_, i) => baseDate.subtract(pastDays, 'day').add(i, 'day'));
};

const isEqual = (date1: Dayjs, date2: Dayjs) => {
    return date1.year === date2.year && date1.month === date2.month && date1.date === date2.date;
}
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

interface SheduleFormProps {
    filter: Filter,
    home?: boolean
}
const SheduleForm = ({ filter, home }: SheduleFormProps) => {
    const navigate = useNavigate();
    const dateList = useMemo(() => generateDateArray(filter.date), [filter.date]);
    useEffect(() => {
        const index = filter.date === null ? 0 : dateList.findIndex(item => item.isSame(filter.date));
        setSelectedDate(index);
    }, [filter.date]);
    const [selectedDate, setSelectedDate] = useState(0);
    const {data} = serverAPI.useFetchSessionsQuery({
        page: 1,
        itemsPerPage: 10000,
        cinemaId: filter.cinema ? filter.cinema.id : undefined,
        hallId: filter.hall ? filter.hall.id : undefined,
        date: dateList[selectedDate].toISOString(),
    });
    return (
        <Paper
            sx={{
                p: 2,
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
                        
                        {data && data.results.length > 0 ?
                            <>
                                {isEqual(dayjs(data.results[0].startTime), dateList[selectedDate]) &&
                                    <IntervalAlert start={dayjs(data.results[0].startTime).set('hour', 0).set('minute', 0)} end={dayjs(data.results[0].startTime)} />
                                }
                            </>
                            :
                            <IntervalAlert start={dateList[selectedDate].set('hour', 0).set('minute', 0)} end={dateList[selectedDate].set('hour', 23).set('minute', 59)} />

                        }
                        {data && data.results.map((item, index) =>
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
                                {index !== data.results.length - 1 &&
                                    <IntervalAlert start={dayjs(item.endTime)} end={dayjs(data.results[index + 1].startTime)} />
                                }
                            </>
                        )}
                        {(data && data.results.length > 0) && isEqual(dayjs(data.results[data.results.length - 1].endTime),dateList[selectedDate]) && <IntervalAlert start={dayjs(data.results[data.results.length - 1].endTime)} end={dayjs(data.results[data.results.length - 1].endTime).set('hour', 23).set('minute', 59)} />}
                    </Box>
                    {home &&
                        <Box mt={1} display='flex' justifyContent='center'>
                            <Button variant='outlined' 
                            onClick={()=>navigate(`/admin-panel?tab=2&cinemaId=${filter.cinema?.id}&hallId=${filter.hall?.id}${filter.date ? `&date=${filter.date.toISOString()}` : ''}`)}>
                                Go to admin panel
                            </Button>
                        </Box>
                    }
                </>
            }
        </Paper>
    )
}

export default SheduleForm