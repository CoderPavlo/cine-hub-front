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
import AdminPanelPage from "./pages/AdminPanelPage.tsx";
import AdminHomePage from "./pages/AdminHomePage.tsx";
import StatisticsPage from "./pages/StatisticsPage.tsx";
import SeatBookingPage from "./pages/seatBooking/SeatBookingPage.tsx";
import SchedulePage from "./pages/SchedulePage.tsx";
import SearchPage from "./pages/SearchPage.tsx";
import TicketPage from "./pages/TicketPage.tsx";

function App() {
  const { mode } = useAppSelector((state) => state.themeReducer);
  const { role, isLogged } = useAppSelector((state) => state.authReducer);
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
            {!isLogged &&
              <Route path="/login" element={<LoginPage />} />
            }

                <Route path="/schedule" element={<SchedulePage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/movie/:id" element={<AboutMoviePage />} />
                {/*Movie details page*/}
                <Route path="/cart/seatplan" element={<SeatBookingPage />} />
            {role === "User" && (
              <>
                {/*Home page for user*/}
                <Route path="/home" element={<HomePage />} />
                {/*Session schedule page for user*/}
               
                {/*Session details page for user*/}
                {/*Booking page for user*/}
                <Route path="/profile" element={<div />} /> {/*Profile page*/}
                <Route path="/tickets" element={<TicketPage />} />
              </>
            )}
            {role === "Admin" && (
              <>
                <Route path="/home" element={<AdminHomePage />} />
                <Route path="/admin-panel" element={<AdminPanelPage />} />
                {/*Admin panel page for admin*/}
                <Route path="/statistics" element={<StatisticsPage />} />
                {/*Statistics page for admin*/}
                <Route path="/settings" element={<div />} />
                {/*Settings page for admin*/}
              </>
            )}
            {isLogged ?
              <Route path="*" element={<Navigate to="/home" />} /> :
              <Route path="*" element={<Navigate to="/" />} />
            }
            {/*Redirect to main page*/}
          </Routes>
          <Footer />
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
