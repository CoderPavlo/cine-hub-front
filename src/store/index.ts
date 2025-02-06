import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme";
import { themoviedbAPI } from "./api/themoviedb";
const rootReducer = combineReducers({
    themeReducer,
    [themoviedbAPI.reducerPath]: themoviedbAPI.reducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat(themoviedbAPI.middleware)
    })
}

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof setupStore>
export type TAppDispatch = TAppStore['dispatch']