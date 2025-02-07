import { useEffect, useMemo, useState } from 'react'
import { Filter } from './FilterBlock';
import dayjs, { Dayjs } from 'dayjs';
import duration from 'dayjs/plugin/duration';
import { Alert, Box, Button, Chip, Paper, Tab, Tabs, Typography } from '@mui/material';
import { data } from './SessionsTab'
import { useNavigate } from 'react-router-dom';
dayjs.extend(duration);
const generateDateArray = (date: Dayjs | null): Dayjs[] => {
    const today = dayjs().startOf('day');
    const baseDate = date && date.isAfter(today, 'day') ? date : today;
    const pastDays = Math.min(6, baseDate.diff(today, 'day'));
    return Array.from({ length: 14 }, (_, i) => baseDate.subtract(pastDays, 'day').add(i, 'day'));
};

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
    return (
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
                    {home &&
                        <Box mt={1} display='flex' justifyContent='center'>
                            <Button variant='outlined' 
                            onClick={()=>navigate(`/admin-panel?tab=2&cinemaId=${filter.cinema?.id}&hallId=${filter.hall?.id}&date=${filter.date?.toISOString()}`)}>
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