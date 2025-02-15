import { Movie, Search } from "@mui/icons-material"
import { Box, Card, CardContent, CardMedia, ClickAwayListener, IconButton, InputAdornment, Pagination, Paper, Popper, TextField, Typography } from "@mui/material"
import { useState } from "react";
import Transitions from "../layout/Navbar/Transitions";
import { themoviedbAPI } from "../../store/api/themoviedb";
import LoadingComponent from "../common/LoadingComponent";
import { BASE_IMG_URL } from "../../helpers/apiConfig";
import { useAppDispatch } from "../../hooks/storeHooks";

interface FilmFieldProps {
    error?: boolean,
    value: string,
    helperText?: string | false,
    idOnChange: (id: number) => void,
    nameOnChange: (name: string) => void,
    runtimeOnChange: (runtime: number)=>void
}
const FilmField = ({ error, value, helperText, idOnChange, nameOnChange, runtimeOnChange }: FilmFieldProps) => {
    const [open, setOpen] = useState<boolean>(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [filter, setFilter] = useState({ page: 1, query: '' });
    const { data, isFetching, error: searchError, refetch } = themoviedbAPI.useSearchQuery(filter);
    const dispatch = useAppDispatch();
    return (
        <>
            <TextField
                value={value}
                label="Film"
                fullWidth
                error={error}
                helperText={helperText}
                slotProps={{
                    input: {
                        endAdornment:
                            <InputAdornment position="end">
                                <IconButton
                                    edge="end"
                                    onClick={(e) => {
                                        setOpen((value) => !value);
                                        setAnchorEl(e.currentTarget);
                                    }}
                                >
                                    <Movie />
                                </IconButton>
                            </InputAdornment>,
                    },
                }}
            />
            <Popper
                style={{
                    paddingInline: '24px',
                    width: '100%',
                    zIndex: 1000
                }}
                open={open}
                anchorEl={anchorEl}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: 'offset',
                            options: {
                                offset: [0, 9]
                            }
                        }
                    ]
                }}
            >
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        {open && (

                            <ClickAwayListener onClickAway={() => setOpen(false)}>
                                <Paper
                                    sx={{ p: 2 }}
                                >
                                    <Typography variant="caption" textTransform='uppercase' color='textSecondary'>Select Film</Typography>

                                    <Box sx={{ display: 'flex', alignItems: 'flex-end' }} mt={1}>
                                        <Search sx={{ color: 'action.active', mr: 1, my: 0.5 }} />
                                        <TextField
                                            value={filter.query}
                                            label="Query"
                                            fullWidth
                                            onChange={(e) => setFilter({ page: 1, query: e.target.value })}
                                            size="small"
                                            variant="standard"
                                        />
                                        </Box>
                                        <LoadingComponent loading={isFetching}
                                            error={Boolean(searchError)}
                                            refetch={refetch}
                                        >
                                            <Box height='300px' my={1} gap={1} overflow='scroll'>
                                            {data && data.results.map(movie =>
                                                <button key={movie.id} style={{ padding: 0, border: 'none', background: 'transparent', width: '100%', cursor: 'pointer' }}
                                                    onClick={async () => {
                                                        const result = dispatch(themoviedbAPI.endpoints.fetchMovie.initiate(movie.id));
                                                        try {
                                                            const response = await result.unwrap();
                                                            idOnChange(movie.id);
                                                            nameOnChange(movie.title);
                                                            runtimeOnChange(response.runtime);
                                                            setOpen(false);
                                                        } catch (err) {
                                                            console.error('Error fetching movie:', err);
                                                        }
                                                    }}>
                                                    <Card sx={{ display: 'flex', flexDirection: 'row' }}>
                                                            <CardMedia
                                                                component="img"
                                                                sx={{ width: 100 }}
                                                                image={`${BASE_IMG_URL}w200${movie.poster_path}`}
                                                                alt={movie.title}
                                                                loading="lazy"
                                                            />
                                                            <CardContent sx={{ display: 'flex', flexGrow: 1, flexDirection: 'column', width: '100%',  }}>
                                                                <Typography component="div" variant="h5">
                                                                    {movie.title}
                                                                </Typography>
                                                                <Typography
                                                                    variant="subtitle1"
                                                                    component="div"
                                                                    sx={{ color: 'secondary' }}
                                                                >
                                                                    Release date: {movie.release_date}
                                                                </Typography>
                                                                <Typography variant="body2" color="textSecondary">
                                                                    Rating: {movie.vote_average.toFixed(1)}
                                                                </Typography>
                                                            </CardContent>
                                                    </Card>
                                                </button>
                                            )}
                                            </Box>
                                            {data && data.total_pages > 1 &&
                                                <Pagination count={data.total_pages} variant="outlined" color="primary" page={filter.page} onChange={(e, page) => setFilter({...filter, page:page})}
                                                    size='small'
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center'
                                                    }}
                                                />
                                            }

                                        </LoadingComponent>
                                </Paper>
                            </ClickAwayListener>
                        )}
                    </Transitions>
                )}
            </Popper>

        </>
    )
}

export default FilmField