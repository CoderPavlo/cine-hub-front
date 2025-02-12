import { AccessTime, Public, Search } from "@mui/icons-material"
import { Autocomplete, Card, CardContent, Checkbox, FormControlLabel, Grid2, Pagination, Stack, TextField, Typography } from "@mui/material"
import { useState } from "react"
import { SearchRequest } from "../models/movie"
import { themoviedbAPI } from "../store/api/themoviedb"
import LoadingComponent from "../components/common/LoadingComponent"
import MovieCardSkeleton from "../components/home/MovieCardSkeleton"
import MovieCard from "../components/home/MovieCard"
import TrailerDialog from "../components/home/TrailerDialog"

const SearchPage = () => {
    const { data: regions } = themoviedbAPI.useFetchRegionsQuery();
    const [filter, setFilter] = useState<SearchRequest>({
        query: '',
        include_adult: false,
        page: 1,
        region: null,
        year: '',
    });
    const handleChangeFilter = (name: keyof SearchRequest, value: SearchRequest[typeof name]) => {
        setFilter(prev => ({
            ...prev,
            page: 1,
            [name]: value
        }));
    };
    const { data, isFetching, error, refetch } = themoviedbAPI.useSearchQuery(filter);
    const { data: genresData } = themoviedbAPI.useFetchGenresQuery();
    const [movieId, setMovieId] = useState<number | null>(null);
    return (
        <Grid2 container px={{ md: '24px' }} spacing={3} my={4}>
            <Grid2 size={{ xs: 12, md: 3 }} >
                <Card>
                    <CardContent component={Stack} spacing={2}>
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Search color='primary' />
                            <Typography variant="h5" color='text.primary'>
                                Search
                            </Typography>
                        </Stack>
                        <TextField
                            value={filter.query}
                            label="Movie name"
                            onChange={(e) => handleChangeFilter('query', e.target.value)}
                            fullWidth
                        />
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <AccessTime color='primary' />
                            <Typography variant="h5" color='text.primary'>
                                Year
                            </Typography>
                        </Stack>
                        <TextField
                            value={filter.year}
                            label="Movie year"
                            type='number'
                            onChange={(e) => {
                                let value = Number(e.target.value);
                                if (!isNaN(value) && value > 0 || e.target.value === '')
                                    handleChangeFilter('year', e.target.value);
                            }}
                            error={(Number(filter.year) < 1900 || Number(filter.year) > new Date().getFullYear()) && filter.year !== ''}
                            helperText={(Number(filter.year) < 1900 || Number(filter.year) > new Date().getFullYear()) && filter.year !== '' ? 'Enter correct year' : undefined}
                            fullWidth
                        />
                        <Stack direction='row' spacing={1} alignItems='center'>
                            <Public color='primary' />
                            <Typography variant="h5" color='text.primary'>
                                Country
                            </Typography>
                        </Stack>
                        <Autocomplete
                            value={regions ? regions.results.find(item => item.iso_3166_1 === filter.region) : null}
                            onChange={(event, newValue) => handleChangeFilter('region', newValue ? newValue.iso_3166_1 : newValue)}
                            options={regions ? regions.results : []}
                            getOptionLabel={(option) => option.english_name}
                            renderInput={(params) => <TextField {...params}
                                label="Movie country" />}
                            noOptionsText='There are no countries'
                            isOptionEqualToValue={(option, value) => option.iso_3166_1 === value.iso_3166_1}
                        />
                        <FormControlLabel control={<Checkbox value={filter.include_adult} onChange={e => handleChangeFilter('include_adult', e.target.checked)} />} label="Include adult" />
                    </CardContent>
                </Card>
            </Grid2>
            <Grid2 size={{ xs: 12, md: 9 }} minHeight={{md:'500px'}}>
                <LoadingComponent loading={isFetching} error={Boolean(error)} refetch={refetch} height="536px"
                    skeleton={(
                        <Grid2 container spacing={3}>
                            {[...Array(3)].map((item, index) => (
                                <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={index}>
                                    <MovieCardSkeleton />
                                </Grid2>
                            ))}
                        </Grid2>
                    )}
                >
                    <Grid2 container spacing={3}>
                        {data && data.results.map((movie) => (
                            <Grid2 size={{ xs: 12, sm: 6, md: 4 }} key={movie.id}>
                                <MovieCard movie={movie} genresData={genresData} buttonOnClick={() => setMovieId(movie.id)} />
                            </Grid2>
                        ))}
                    </Grid2>
                </LoadingComponent>
                {data && data.total_pages > 1 &&
                    <Pagination count={data?.total_pages} variant="outlined" color="primary" page={filter.page} onChange={(e, page) => handleChangeFilter('page', page)}
                        size='large'
                        sx={{
                            paddingBlock: 2,
                            display: 'flex',
                            justifyContent: 'center'
                        }}
                    />
                }
            </Grid2>
            <TrailerDialog id={movieId!=null ? movieId : undefined} onClose={() => setMovieId(null)} open={movieId != null}/>
        </Grid2>
    )
}

export default SearchPage