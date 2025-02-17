import { Card, CardContent, CardMedia, Chip, Grid2, Link, Stack, Typography, useTheme } from "@mui/material";
import { themoviedbAPI } from "../../store/api/themoviedb";
import { BASE_IMG_URL } from "../../helpers/apiConfig";
import dayjs from "dayjs";
import LoadingComponent from "../common/LoadingComponent";
import SessionCardSkeleton from "./SessionCardSkeleton";
import { Session } from "../../models/tables";

interface SessionsCardProps {
    item: { filmId: number; sessions: Session[] },
}

const SessionsCard = ({ item }: SessionsCardProps) => {

    const { data, isFetching, error, refetch } = themoviedbAPI.useFetchMovieQuery(item.filmId);
    const theme = useTheme();
    return (
        <LoadingComponent loading={isFetching} skeleton={<SessionCardSkeleton/>} error={Boolean(error)} refetch={refetch} height='100%'>
        <Card sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, height: '100%' }}>
            <Link href={`/movie/${item.filmId}`} underline="none" width={{ md: '50%' }}>
                <CardMedia
                    component="img"
                    image={`${BASE_IMG_URL}w500${data?.poster_path}`}
                    alt={data?.title}
                    sx={{
                        aspectRatio: "2/3", objectFit: "cover", transition: "transform 0.2s",
                        "&:hover": {
                            transform: "scale(1.02)"
                        },
                        height: '100%'
                    }}
                />
            </Link>
            <CardContent component={Stack} direction='column' spacing={2} flexGrow={1}>
                <Typography variant='h4' color='text.primary' textAlign='center'>
                    {data?.title}
                </Typography>
                <Stack direction='row' spacing={1} alignItems='center' justifyContent={{ xs: 'center', md: 'left' }}>
                    {data?.adult &&
                        <Typography variant='h6' color='text.primary' sx={{ borderRight: `1px solid ${theme.palette.divider}`, px: 1 }}>
                            18+
                        </Typography>
                    }
                    {data?.genres && data.genres.map((genre) => (
                        <Chip key={genre.id} label={genre.name} size="small" />
                    ))}
                </Stack>
                <Typography variant='h6' color='text.secondary'>
                    {dayjs(item.sessions[0].endTime).format('ddd DD MMM')}
                </Typography>
                <Grid2 container width='100%' spacing={2}>
                    {item.sessions.map(session =>
                        <Grid2 size={6}>
                            <Link href={`/cart/seatplan?id=${session.id}`} underline="none">
                                <Card sx={{
                                    bgcolor: 'background.default', borderRadius: 5, transition: "transform 0.2s",
                                    "&:hover": {
                                        transform: "scale(1.02)"
                                    }
                                }} elevation={3}>
                                    <CardContent>
                                        <Typography variant='h5' color='text.primary' textAlign='center'>
                                            {dayjs(session.startTime).format('HH:mm')}
                                        </Typography>
                                        <Stack direction='row' alignItems='center' justifyContent='center' spacing={1}>
                                            <Chip color="primary" label={session.formatType} size="small" />
                                            <Typography variant='body1' color='text.secondary'>
                                                {session.price} $
                                            </Typography>
                                        </Stack>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid2>
                    )}
                </Grid2>
            </CardContent>
        </Card>
        </LoadingComponent>
    )
}

export default SessionsCard