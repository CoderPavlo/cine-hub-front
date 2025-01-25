import { Box, Typography } from "@mui/material";
import { useState } from "react";
import SwitchSelector from "react-switch-selector";
import SignUpForm from "../../components/loginPageComponents/SignUpForm";
import LoginForm from "../../components/loginPageComponents/LoginForm";
import "./Login.scss";

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

  return (
    <>
      <Box className="container-login">
        <Box className="cinema-title-container">
          <Typography
            sx={{
              fontWeight: 800,
              fontSize: "44px",
              color: "primary.main",
              marginBottom: "10px",
            }}
          >
            CinemaHub
          </Typography>
          <Typography
            sx={{ fontWeight: 600, fontSize: "20px", fontStyle: "italic" }}
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
              backgroundColor={"#cfd1d9"}
              selectedBackgroundColor={"#0075e8"}
              fontSize={20}
              selectedColor={"white"}
            />
          </div>

          {checked ? <SignUpForm /> : <LoginForm />}
        </Box>
      </Box>
    </>
  );
}

export default LoginPage;
