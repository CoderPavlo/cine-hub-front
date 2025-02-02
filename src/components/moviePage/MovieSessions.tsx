import { useState } from "react";
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
  Tooltip,
} from "@mui/material";
import QuestionMarkIcon from "@mui/icons-material/QuestionMark";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { useNavigate } from "react-router-dom";
import { generateSessions, Session } from "../../helpers/lib/sessionsGenerator";

// Data of movie sessions for demo
const mockSessions = generateSessions();

const formatDescription = {
  SDH: "Subtitles for the Deaf or Hard-of-Hearing",
  LUX: "A session on recliner chairs that provide increased viewing comfort for movie enthusiasts",
  VIP: "A session in a separate hall with the option of waiter service directly during the session",
};

const MovieSessions = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(0);
  const [expandedCinema, setExpandedCinema] = useState<string | false>(false);

  // Movie sessions dates
  const dates = Array.from({ length: 7 }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + i);
    return date;
  });

  // Movie sessions on particular date
  const filteredSessions = mockSessions.filter(
    (session) =>
      session.date === dates[selectedDate].toISOString().split("T")[0]
  );

  // Grouping sessions by cinema
  console.log("Filtered Sessions:");
  console.log(filteredSessions);

  const groupedSessions = filteredSessions.reduce((acc, session) => {
    if (!acc[session.cinema]) {
      acc[session.cinema] = [];
    }
    acc[session.cinema].push(session);
    return acc;
  }, {} as Record<string, typeof mockSessions>);

  console.log("groupedSessions:");
  console.log(groupedSessions);

  const handleDateChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedDate(newValue);
  };
  console.log("selectedDate:");
  console.log(selectedDate);
  console.log("expandedCinema:");
  console.log(expandedCinema);

  const handleCinemaChange =
    (cinema: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
      setExpandedCinema(isExpanded ? cinema : false);
    };

  const handleSessionTimeClick = (time: string) => {
    console.log("TIME:");
    console.log(time);

    navigate(`/cart/${time}`);
  };

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

      {/* Different dates tabs */}
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

      {/* List of cinemas & sessions */}
      <Box
        sx={{
          maxHeight: { xs: "auto", lg: "calc(100vh - 390px)" },
          overflowY: "scroll",
          scrollbarWidth: "thin",
        }}
      >
        {Object.entries(groupedSessions).map(([cinema, sessions]) => (
          <Accordion
            key={cinema}
            // expanded={expandedCinema === cinema}
            // onChange={handleCinemaChange(cinema)}
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
              {sessions.map((session) => (
                <Box
                  key={session.id}
                  sx={{
                    "&:not(:last-child)": {
                      mb: "25px",
                    },
                  }}
                >
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
                    {session.format.split(" ").map((f) => (
                      <Tooltip
                        title={`${formatDescription[f]}`}
                        arrow
                        placement="top"
                      >
                        <Chip
                          label={f}
                          component="span"
                          size="small"
                          icon={
                            <QuestionMarkIcon
                              sx={{
                                fill: "white",
                              }}
                            />
                          }
                          sx={{
                            mr: 1,
                            "& .MuiChip-icon": {
                              fontSize: "10px",
                            },
                          }}
                        />
                      </Tooltip>
                    ))}
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 2,
                    }}
                  >
                    {session.times.map((time) => (
                      <Chip
                        key={time}
                        label={time}
                        variant="outlined"
                        // onClick={() => handleSessionTimeClick(time)}
                        component="a"
                        href={`/cart/${time}`}
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
                </Box>
              ))}
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>

      {filteredSessions.length === 0 && (
        <Typography color="error" sx={{ textAlign: "center", my: 2 }}>
          No sessions. PLease, choose another date
        </Typography>
      )}
    </Box>
  );
};

export default MovieSessions;
