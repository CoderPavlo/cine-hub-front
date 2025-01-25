import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";

export default function PasswordInput({
  password,
  handlePassword,
  onBlur,
  error,
  helperText,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <TextField
        id="password"
        name="password"
        type={showPassword ? "text" : "password"}
        label="Password"
        value={password}
        onChange={handlePassword}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        fullWidth
        onBlur={onBlur}
        error={error}
        helperText={helperText}
      />
    </>
  );
}
