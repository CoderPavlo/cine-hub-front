import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../helpers/apiConfig';
import prepareHeaders from './prepareHeaders';
import { Cinema, Hall } from '../../models/tables';
import { CreateHall, GetHalls, GetRequest, PaginationProps, UpdateHall, User } from '../../models/api';

const serverAPI = createApi({
    reducerPath: 'serverAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ['Cinema', 'Hall'],
    endpoints: (build) => ({
        fetchCinemas: build.query<GetRequest<Cinema>, PaginationProps>({
            query: ({page, itemsPerPage}) => ({
                url: `cinema?itemsPerPage=${itemsPerPage}&page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Cinema'],
        }),
        createCinema: build.mutation<void, Omit<Cinema, "id">>({
            query: (data) => ({
                url: 'cinema',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Cinema'],
        }),
        updateCinema: build.mutation<void, Cinema>({
            query: ({ id, ...data }) => ({
                url: `cinema/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Cinema'],
        }),
        deleteCinema: build.mutation<void, string>({
            query: (id) => ({
                url: `cinema/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Cinema'],
        }),
        fetchHalls: build.query<GetRequest<Hall>, GetHalls>({
            query: ({page, itemsPerPage, cinemaId}) => ({
                url: `hall?itemsPerPage=${itemsPerPage}&page=${page}${cinemaId ? `&cinemaId=${cinemaId}` : ''}`,
                method: 'GET',
            }),
            providesTags: ['Hall'],
        }),
        createHall: build.mutation<void, CreateHall>({
            query: (data) => ({
                url: 'hall',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Hall'],
        }),
        updateHall: build.mutation<void, UpdateHall>({
            query: ({ id, ...data }) => ({
                url: `hall/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Hall'],
        }),
        deleteHall: build.mutation<void, string>({
            query: (id) => ({
                url: `hall/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Hall'],
        }),
        fetchUser: build.query<User, void>({
            query: () => ({
                url: `user`,
                method: 'GET',
            }),
        }),
    })
})

export default serverAPI;