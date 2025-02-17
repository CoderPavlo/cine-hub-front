import { Fragment, useEffect, useState } from "react";
import {
  Box,
  Tabs,
  Tab,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Chip,
  useTheme,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Session } from "../../models/tables";
import { GetRequest } from "../../models/api";
import { BASE_URL } from "../../helpers/apiConfig";
const groupByCinema = (sessions: Session[]) => {
  return sessions.reduce((acc, session) => {
    if (!acc[session.cinemaLocation]) {
      acc[session.cinemaLocation] = [];
    }
    acc[session.cinemaLocation].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>)
}
const groupByFormat = (sessions: Session[]) => {
  return sessions.reduce((acc, session) => {
    if (!acc[session.formatType]) {
      acc[session.formatType] = [];
    }
    acc[session.formatType].push(session);
    return acc;
  }, {} as Record<string, typeof sessions>)
}
const MovieSessions = ({ movieId }: { movieId: number }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);

  // Movie sessions dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  const handleDateChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDate(newValue);
  };
  // navigate(`/cart/seatplan`, { state: userSessionInfo });
  const [data, setData] = useState<GetRequest<Session> | undefined>(undefined);
  useEffect(() => {
    fetch(`${BASE_URL}api/sessions?page=1&itemsPerPage=10000&date=${dates[selectedDate].toISOString()}&filmId=${movieId}`)
      .then((response) => response.json())
      .then((data) => setData(data))
      .catch((error) => console.error("Failed to fetch movie data:", error));
  }, [movieId, selectedDate]);
  return (
    <Box>
      <Typography
        variant="body1"
        color="text.primary"
        gutterBottom
        sx={{ fontWeight: 600 }}
      >
        Choose date:
      </Typography>
      <Tabs
        value={selectedDate}
        onChange={handleDateChange}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          mb: 3,
          ".MuiTabs-scrollButtons.Mui-disabled": {
            opacity: 0.3,
          },
          ".MuiTabs-scrollButtons": {
            color: "#b02e2f",
            width: "10px",
          },
          "& .MuiTabs-scroller": {
            mx: "10px",
          },
        }}
      >
        {dates.map((date, index) => (
          <Tab
            key={index}
            label={date.toLocaleDateString("en-GB", {
              weekday: "short",
              day: "numeric",
              month: "short",
            })}
            sx={{ textTransform: "capitalize" }}
          />
        ))}
      </Tabs>
      <Box
        sx={{
          maxHeight: { xs: "auto", lg: "calc(100vh - 390px)" },
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
        {data && Object.entries(groupByCinema(data.results)).map(([cinema, sessions]) => (
          <Accordion
            key={cinema}
            sx={{
              mb: 2,
              borderRadius: "8px",
              "&:last-of-type": {
                borderRadius: "8px",
                marginBottom: "16px !important",
              },
              "&:first-of-type": {
                borderRadius: "8px",
              },
              "&:before": {
                display: "none",
              },
            }}
            defaultExpanded
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              sx={{
                minHeight: "unset",
                "&.Mui-expanded": {
                  minHeight: "unset",
                },
                "& .MuiAccordionSummary-content": {
                  margin: "12px",
                  "&.Mui-expanded": {
                    margin: "12px",
                  },
                },
                backgroundColor:
                  theme.palette.mode === "light"
                    ? "rgba(0, 0, 0, .1)"
                    : "rgb(54, 62, 87)",
              }}
            >
              <Typography sx={{ fontWeight: 600 }}>{cinema}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              {Object.entries(groupByFormat(sessions)).map(([format, sessionsByFormat]) => (
                <Fragment key={format}>
                  <Box sx={{ mb: "8px" }}>
                    <Typography
                      variant="subtitle2"
                      sx={{
                        mb: 1,
                        display: "inline-block",
                        mr: 1,
                      }}
                    >
                      Format:
                    </Typography>
                    <Chip
                      label={format}
                      component="span"
                      size="small"
                      sx={{
                        mr: 1,
                      }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {sessionsByFormat.map((session, index) => (
                      <Chip
                        key={index}
                        label={dayjs(session.startTime).format('HH:mm')}
                        variant="outlined"
                        onClick={() => navigate(`/cart/seatplan?id=${session.id}`)}
                        component="a"
                        href={"#"}
                        clickable
                        color="primary"
                        sx={{
                          transition: "all .3s ease",
                          borderRadius: "8px",
                          borderColor: "primary.main",
                          "&:hover": {
                            backgroundColor: "#b02e2f !important",
                            color: "#ffffff",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Fragment>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {data && data.results.length === 0 && (
        <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
          No sessions. PLease, choose another date
        </Typography>
      )}
    </Box>
  );
};

export default MovieSessions;
