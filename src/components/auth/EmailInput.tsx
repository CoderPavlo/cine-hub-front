import { InputAdornment, TextField, TextFieldProps } from "@mui/material";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import { ChangeEvent } from "react";

// Типізація пропсів
interface EmailInputProps {
  email: string; 
  handleEmail: (event: ChangeEvent<HTMLInputElement>) => void; 
  onBlur?: TextFieldProps["onBlur"]; 
  error?: boolean; 
  helperText?: string | false; 
}

export default function EmailInput({
  email,
  handleEmail,
  onBlur,
  error,
  helperText,
}: EmailInputProps) {
  return (
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
  );
}