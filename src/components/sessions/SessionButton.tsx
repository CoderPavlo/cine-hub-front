import { Chip, Grid2, IconButton, ListItem, ListItemButton, Paper, Skeleton, Stack, SxProps, Typography, useTheme } from "@mui/material"
import { Session } from "../../pages/SchedulePage"
import { ArrowForward, Update } from "@mui/icons-material"
import { themoviedbAPI } from "../../store/api/themoviedb";
import LoadingComponent from "../common/LoadingComponent";
import { useNavigate } from "react-router-dom";

interface SessionButtonProps {
    item: Session,
}
const SessionButton = ({ item }: SessionButtonProps) => {
    const theme = useTheme();
    const { data, isFetching, error, refetch } = themoviedbAPI.useFetchMovieQuery(item.filmId);
    const borderStyleMd: SxProps = { borderRight: { md: `1px solid ${theme.palette.divider}` } };
    const borderStyle: SxProps = { borderRight: `1px solid ${theme.palette.divider}` };
    const centeredStyle: SxProps = { display:'flex', alignItems: 'center', justifyContent: 'center' };
    const navigate = useNavigate();
    return (
        <LoadingComponent loading={isFetching} skeleton={<ListItem divider><Skeleton height='97px' width='100%' /></ListItem>} error={Boolean(error)}
            errorComponent={
                <ListItem divider>
                    <Typography variant='h6' color='error' textAlign='center' height='96px' sx={centeredStyle} >
                        An error occurred while loading
                        <IconButton sx={{ marginLeft: 1 }} onClick={refetch}>
                            <Update />
                        </IconButton>
                    </Typography>
                </ListItem>
            }
        >
            <ListItemButton divider sx={{
                "&:hover .paper": { backgroundColor: theme.palette.primary.main },
                "&:hover .title": { color: theme.palette.primary.main }
            }} onClick={()=>navigate(`/cart/seatplan?id=${item.id}`)}>
                <Grid2 container width='100%'>
                    <Grid2 size={{ xs: 12, md: 2 }} sx={borderStyleMd}>
                        <Typography className="title" color='text.primary' variant='h5' textAlign='center'>
                            {new Date(item.startTime).toLocaleTimeString("en-gb", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false,
                            })}
                        </Typography>
                        <Typography color='text.secondary' variant='h6' textAlign='center' fontWeight={700}>
                            {item.hall}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 7 }} sx={{ ...borderStyleMd, px: 2 }}>
                        <Typography className="title" variant='h5' color='text.primary' textAlign={{ xs: 'center', md: 'left' }}>
                            {data?.title}
                        </Typography>
                        <Stack direction='row' spacing={1} alignItems='center' justifyContent={{ xs: 'center', md: 'left' }}>
                            {data?.adult &&
                                <Typography variant='h6' color='text.primary' sx={{ ...borderStyle, px: 1 }}>
                                    18+
                                </Typography>
                            }
                            {data?.genres && data.genres.map((genre) => (
                                <Chip key={genre.id} label={genre.name} size="small" />
                            ))}
                        </Stack>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 1 }} sx={centeredStyle}>
                        <Typography variant='h6' color='text.primary' width='100%' textAlign='center' sx={{ ...borderStyleMd, px: 1 }}>
                            {item.price} $
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ xs: 12, md: 1 }} sx={centeredStyle}>
                        <Typography variant='h6' color='text.secondary' width='100%' textAlign='center' sx={{ ...borderStyleMd, px: 1 }}>
                            {item.formatType}
                        </Typography>
                    </Grid2>
                    <Grid2 size={{ md: 1 }} sx={centeredStyle}>
                        <Paper className="paper" variant="outlined" sx={{ ...centeredStyle,
                            display: { xs: 'none', md: 'flex' }, bgcolor: 'background.default', borderRadius: '12px', width: 'fit-content', height: '100%', aspectRatio: "1 / 1",
                        }}>
                            <ArrowForward />
                        </Paper>
                    </Grid2>
                </Grid2>
            </ListItemButton>
        </LoadingComponent>
    )
}

export default SessionButton