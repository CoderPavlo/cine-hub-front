import { combineReducers, configureStore } from "@reduxjs/toolkit";
import themeReducer from "./slices/theme";
const rootReducer = combineReducers({
    themeReducer,
})

export const setupStore = () => {
    return configureStore({
        reducer: rootReducer,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware().concat()
    })
}

export type TRootState = ReturnType<typeof rootReducer>
export type TAppStore = ReturnType<typeof setupStore>
export type TAppDispatch = TAppStore['dispatch']