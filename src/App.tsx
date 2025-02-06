import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/layout/Navbar/Navbar.tsx";
import Footer from "./components/layout/Footer";
import MainPage from "./pages/MainPage";
import { CssBaseline, ThemeProvider, useMediaQuery } from "@mui/material";
import LoginPage from "./pages/loginPage/LoginPage.tsx";
import { useAppSelector } from "./hooks/storeHooks.ts";
import { getTheme } from "./store/slices/theme.ts";
import AboutMoviePage from "./pages/aboutMovie/AboutMoviePage.js";
import HomePage from "./pages/HomePage.tsx";

export const role: "admin" | "user" = "user"; //for demo

function App() {
  const { mode } = useAppSelector((state) => state.themeReducer);
  const systemMode = useMediaQuery("(prefers-color-scheme: dark)")
    ? "dark"
    : "light";
  return (
    <ThemeProvider theme={getTheme(mode, systemMode)}>
      <CssBaseline />
      <Router>
        <div
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            paddingTop: "64px",
          }}
        >
          <Navbar />
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/login" element={<LoginPage />} />
            {role === "user" && (
              <>
                <Route path="/home" element={<HomePage />} />
                {/*Home page for user*/}
                <Route path="/schedule" element={<div />} />
                {/*Session schedule page for user*/}
                <Route path="/movie/:id" element={<AboutMoviePage />} />
                {/*Movie details page*/}
                <Route path="/session/:id" element={<div />} />
                {/*Session detsils page for user*/}
                <Route path="/booking/:id" element={<div />} />
                {/*Booking page for user*/}
                <Route path="/profile" element={<div />} /> {/*Profile page*/}
              </>
            )}
            {role === "admin" && (
              <>
                <Route path="/admin-panel" element={<div />} />
                {/*Admin panel page for admin*/}
                <Route path="/statistics" element={<div />} />
                {/*Statistics page for admin*/}
                <Route path="/settings" element={<div />} />
                {/*Settings page for admin*/}
              </>
            )}
            <Route path="*" element={<Navigate to="/" />} />
            {/*Redirect to main page*/}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
