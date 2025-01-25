import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // Основний колір (блакитний)
    },
    customSkyColor: "#C3EBFA",
    customSkyLightColor: "#EDF9FD",
    customPurpleColor: "#CFCEFF",
    customPurpleLightColor: "#F1F0FF",
    customYellowColor: "#FAE27C",
    customYellowLightColor: "#FEFCE8",
  },
  typography: {
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
  },
});

export default theme;
