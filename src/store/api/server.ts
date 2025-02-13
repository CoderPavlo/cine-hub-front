import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../helpers/apiConfig';
import prepareHeaders from './prepareHeaders';
import { Cinema } from '../../models/tables';
import { GetRequest, PaginationProps } from '../../models/api';

const serverAPI = createApi({
    reducerPath: 'serverAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ['Cinema'],
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
    })
})

export default serverAPI;