import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { ILoginRequest, IAuthResponse, IRegisterRequest } from '../../models/auth';
import { BASE_URL } from '../../helpers/apiConfig';

const authAPI = createApi({
    reducerPath: 'authAPI',
    baseQuery: fetchBaseQuery({
        baseUrl: BASE_URL + 'auth/',
    }),
    endpoints: (build)=>({
        register: build.mutation<IAuthResponse, IRegisterRequest>({
            query: (user)=> ({
                url: 'register/',
                method: 'POST',
                body: user
            })
        }),
        login: build.mutation<IAuthResponse, ILoginRequest>({
            query: (user)=> ({
                url: 'login/',
                method: 'POST',
                body: user
            })
        }),

    })
})

export default authAPI;