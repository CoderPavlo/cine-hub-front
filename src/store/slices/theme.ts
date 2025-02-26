import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createTheme, PaletteOptions, Theme } from "@mui/material/styles";

const lightPalette: PaletteOptions = {
  mode: "light",
  primary: { main: "#b02e2f" },
  secondary: { main: "#b4b4b4" },
  background: { default: "#ffffff", paper: "#edede8" },
  error: { main: "#FF3D00" },
  warning: { main: "#FFA726" },
  info: { main: "#29B6F6" },
  success: { main: "#66BB6A" },
  text: { primary: "#000000", secondary: "#6d6d6a" },
};

const darkPalette: PaletteOptions = {
  mode: "dark",
  primary: { main: "#b02e2f" },
  secondary: { main: "#b4b4b4" },
  background: { default: "#181f2a", paper: "#0b0e14" },
  error: { main: "#FF3D00" },
  warning: { main: "#FFA726" },
  info: { main: "#29B6F6" },
  success: { main: "#66BB6A" },
  text: { primary: "#ffffff", secondary: "#b8e2f2" },
};

export type TMode = "dark" | "light" | "system";

export const getTheme = (mode: TMode, systemMode: TMode): Theme => {
  const prefersMode = mode === "system" ? systemMode : mode;
  return createTheme({
    palette: prefersMode === "dark" ? darkPalette : lightPalette,
  });
};
const initialMode: TMode =
  (Cookies.get("mode") as TMode | undefined) || "system";
export const themeSlice = createSlice({
  name: "theme",
  initialState: {
    mode: initialMode,
  },
  reducers: {
    setMode: (state, action: PayloadAction<TMode>) => {
      state.mode = action.payload;
      Cookies.set("mode", action.payload);
    },
  },
});
export const { setMode } = themeSlice.actions;
export default themeSlice.reducer;
