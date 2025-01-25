import { InputAdornment, TextField } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";

export default function EmailInput({
  email,
  handleEmail,
  onBlur,
  error,
  helperText,
}) {
  return (
    <>
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        value={email}
        onChange={handleEmail}
        onBlur={onBlur}
        error={error}
        helperText={helperText}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <AlternateEmailIcon sx={{ color: "action.active" }} />
            </InputAdornment>
          ),
        }}
      />
    </>
  );
}
