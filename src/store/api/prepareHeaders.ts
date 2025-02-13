import Cookies from "js-cookie";
import { IAuthResponse } from "../../models/auth";
import { deleteTokens, saveTokens } from "../slices/auth";
import { BASE_URL } from "../../helpers/apiConfig";

export default async function prepareHeaders(headers: Headers): Promise<Headers> {
    let accessToken = Cookies.get('accessToken');
    let refreshToken = Cookies.get('refreshToken');

    if (!accessToken && refreshToken) {
        try {
            const response = await fetch(BASE_URL + 'auth/refresh/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ token: refreshToken })
            });

            if (response.ok) {
                const auth: IAuthResponse = await response.json();
                saveTokens(auth);
                accessToken = auth.accessToken;
            }
            else {
                deleteTokens();
                window.history.pushState(null, '', '/');
            }
        } catch (error) {
            console.error("Failed to refresh token:", error);
            deleteTokens();
            window.history.pushState(null, '', '/');
        }
    }

    if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
    }

    return headers;
}
