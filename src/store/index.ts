import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme";
import authReducer from "./slices/auth";
import { themoviedbAPI } from "./api/themoviedb";
import authAPI from "./api/auth";
const rootReducer = combineReducers({
    themeReducer,
    authReducer,
    [themoviedbAPI.reducerPath]: themoviedbAPI.reducer,
    [authAPI.reducerPath]: authAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(themoviedbAPI.middleware, authAPI.middleware)
    })
}

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof setupStore>   
export type TAppDispatch = TAppStore['dispatch']