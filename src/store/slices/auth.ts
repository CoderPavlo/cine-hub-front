import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import { IAuthResponse } from '../../models/auth';
import { ACCESS_LIFETIME, REFRESH_LIFETIME } from '../../helpers/apiConfig';

export const saveTokens = (auth: IAuthResponse) => {
    const accessExpiration = new Date();
    accessExpiration.setTime(accessExpiration.getTime() + ACCESS_LIFETIME * 60 * 1000);
    Cookies.set('accessToken', auth.accessToken, { expires: accessExpiration });

    const refreshExpiration = new Date();
    refreshExpiration.setTime(refreshExpiration.getTime() + REFRESH_LIFETIME * 60 * 1000);
    Cookies.set('role', auth.role, { expires: refreshExpiration });
    Cookies.set('refreshToken', auth.refreshToken, { expires: refreshExpiration });
}

export const deleteTokens = () => {
    Cookies.remove('role');
    Cookies.remove('accessToken');
    Cookies.remove('refreshToken');
}

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        role: Cookies.get('role'),
        isLogged: Cookies.get('refreshToken') != undefined,
    },
    reducers: {
        setTokens: (state, action: PayloadAction<IAuthResponse>) => {
            saveTokens(action.payload);
            state.role = action.payload.role;
            state.isLogged = true;
        },
        clearTokens: (state) => {
            state.isLogged = false;
            state.role = undefined;
            deleteTokens();
        }
    },
});

export const { setTokens, clearTokens } = authSlice.actions;

export default authSlice.reducer;