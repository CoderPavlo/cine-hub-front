import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { BASE_URL } from '../../helpers/apiConfig';
import prepareHeaders from './prepareHeaders';
import { Cinema, Hall, Session } from '../../models/tables';
import { CreateHall, CreateSessions, GetHalls, GetRequest, GetSessions, PaginationProps, UpdateHall, UpdateSession, User } from '../../models/api';
import { CreateTicket, SessionDetail, Ticket, TicketSeat } from '../../models/tickets';

const serverAPI = createApi({
    reducerPath: 'serverAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'api/',
        prepareHeaders: prepareHeaders
    }),
    tagTypes: ['Cinema', 'Hall', 'Session', 'User', 'Ticket'],
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
            query: (data) => {
                const params = new URLSearchParams();
                Object.entries(data).forEach(([key, value]) => {
                    if (value)
                        params.append(key, String(value));
                });
                return {
                    url: `hall?${params.toString()}`,
                    method: 'GET',
                };
            },
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
            providesTags: ['User'],
        }),
        fetchSessions: build.query<GetRequest<Session>, GetSessions>({
            query: (data) => {
                const params = new URLSearchParams();
                Object.entries(data).forEach(([key, value]) => {
                    if (value)
                        params.append(key, String(value));
                });
                return {
                    url: `sessions?${params.toString()}`,
                    method: 'GET',
                };
            },
            providesTags: ['Session'],
        }),
        createSessions: build.mutation<void, CreateSessions>({
            query: (data) => ({
                url: 'sessions',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Session'],
        }),
        updateSession: build.mutation<void, UpdateSession>({
            query: ({ id, ...data }) => ({
                url: `sessions/${id}`,
                method: 'PUT',
                body: data,
            }),
            invalidatesTags: ['Session'],
        }),
        deleteSession: build.mutation<void, string>({
            query: (id) => ({
                url: `sessions/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Session'],
        }),
        fetchTickets: build.query<GetRequest<Ticket>, PaginationProps>({
            query: ({page, itemsPerPage}) => ({
                url: `tickets?itemsPerPage=${itemsPerPage}&page=${page}`,
                method: 'GET',
            }),
            providesTags: ['Ticket'],
        }),
        createTicket: build.mutation<void, CreateTicket>({
            query: (data) => ({
                url: 'tickets',
                method: 'POST',
                body: data,
            }),
            invalidatesTags: ['Ticket'],
        }),
        fetchReserved: build.query<SessionDetail, string>({
            query: (id) => ({
                url: `tickets/reserved?sessionId=${id}`,
                method: 'GET',
            }),
            providesTags: ['Ticket'],
        }),
    })
})

export default serverAPI;