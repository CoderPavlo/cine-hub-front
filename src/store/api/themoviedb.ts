import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { Genre, GetTrailerRequest, Movie, MovieDetail, Region, SearchRequest } from '../../models/movie';
import { API_BASE_URL, API_KEY } from '../../helpers/apiConfig';
import { GetRequest } from '../../models/api';

export const themoviedbAPI = createApi({
    reducerPath: 'themoviedbAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: API_BASE_URL,
    }),
    endpoints: (build) => ({
        fetchGenres: build.query<{ genres: Genre[] }, void>({
            query: () => ({
                url: `genre/movie/list?api_key=${API_KEY}&language=en-US`,
                method: 'GET',
            }),
        }),
        fetchPopularMovies: build.query<GetRequest<Movie>, number>({
            query: (page) => ({
                url: `movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`,
                method: 'GET',
            }),
        }),
        fetchNewMovies: build.query<GetRequest<Movie>, number>({
            query: (page) => ({
                url: `discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&language=en-US&page=${page}`,
                method: 'GET',
            }),
        }),
        fetchTrailer: build.query<GetTrailerRequest, number | undefined>({
            query: (id) => ({
                url: `movie/${id}/videos?language=en-US&api_key=${API_KEY}`,
                method: 'GET',
            }),
        }),
        fetchMovie: build.query<MovieDetail, number>({
            query: (id) => ({
                url: `movie/${id}?language=en-US&api_key=${API_KEY}`,
                method: 'GET',
            }),
        }),
        search: build.query<GetRequest<Movie>, SearchRequest>({
            query: (data) => {
                const params = new URLSearchParams();
                params.append('query', data.query);
                params.append('api_key', API_KEY);
                params.append('language', 'en-US');
                params.append('page', data.page.toString());
                params.append('include_adult', (data.include_adult !== undefined ? data.include_adult : true).toString());
                if (data.primary_release_year)
                    params.append('primary_release_year', data.primary_release_year);
                if (data.region)
                    params.append('region', data.region);
                const year = Number(data.year);
                if (!isNaN(year) && year>1900 && year <= new Date().getFullYear())
                    params.append('year', year.toString());
                return {
                    url: `search/movie?${params.toString()}`,
                    method: 'GET',
                };
            },
        }),
        fetchRegions: build.query<{results: Region[]}, void>({
            query: () => ({
                url: `watch/providers/regions?language=en-US&api_key=${API_KEY}`,
                method: 'GET',
            }),
        }),
    }),
});