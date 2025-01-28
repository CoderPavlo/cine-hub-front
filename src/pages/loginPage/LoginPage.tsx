import { Box, Typography, useTheme } from "@mui/material";
import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import SignUpForm from "../../components/auth/SignUpForm";
import LoginForm from "../../components/auth/LoginForm";
import "./Login.css";

function LoginPage() {
  const [checked, setChecked] = useState(false);
  const handleChange = () => {
    setChecked((prevState) => !prevState);
  };

  const options = [
    {
      label: "Log in",
      value: {
        logIn: true,
      },
    },
    {
      label: "Sign up",
      value: "signIn",
    },
  ];

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "logIn"
  );

  const theme = useTheme();

  return (
    <>
      <Box className="container-login">
        <Box className="cinema-title-container">
          <Typography
            sx={{
              fontWeight: 800,
              marginBottom: "10px",
            }}
            variant="h3"
            color="primary.main"
          >
            CinemaHub
          </Typography>
          <Typography
            variant="h6"
            color="text.primary"
            sx={{ fontWeight: 600, fontStyle: "italic" }}
          >
            Your ticket to the world of entertainment!
          </Typography>
        </Box>
        <Box className="form-registration">
          <div className="switch-selector-container">
            <SwitchSelector
              onChange={handleChange}
              options={options}
              initialSelectedIndex={initialSelectedIndex}
              backgroundColor={theme.palette.secondary.main}
              selectedBackgroundColor={theme.palette.primary.main}
              fontSize={20}
              fontColor={theme.palette.text.secondary}
              selectedFontColor={theme.palette.text.primary}
            />
          </div>
          {checked ? <SignUpForm /> : <LoginForm />}
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
