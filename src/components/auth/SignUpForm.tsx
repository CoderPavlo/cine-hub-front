import { useFormik } from "formik";
import * as yup from "yup";
import {
  Button,
  TextField,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
  FormHelperText,
  Box,
  useTheme,
  Typography,
} from "@mui/material";
import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { useNavigate } from "react-router-dom";
import authAPI from "../../store/api/auth";
import { useAppDispatch } from "../../hooks/storeHooks";
import { IAuthResponse } from "../../models/auth";
import { setTokens } from "../../store/slices/auth";

export default function SignUpForm() {
  const navigate = useNavigate();

  const [register, { isLoading, error }] = authAPI.useRegisterMutation();
  const dispatch = useAppDispatch();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
    name: yup.string().required("First name is required"),
    surname: yup.string().required("Last name is required"),
    gender: yup.string().required("Gender is required"),
    dob: yup.date().required("Date of birth is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      surname: "",
      dob: "",
      email: "",
      password: "",
      gender: "",
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      await register({
        name: values.name,
        surname: values.surname,
        birthday: new Date(values.dob).toISOString(),
        email: values.email,
        password: values.password,
      }).unwrap()
        .then((payload: IAuthResponse) => {
          dispatch(setTokens(payload));
          navigate('/home');
        })
        .catch(async (error) => {
          console.log(error);
        })

    },
  });
  const theme = useTheme();
  return (
    <form onSubmit={formik.handleSubmit} className="form" style={{
      background: theme.palette.background.paper,
    }}>
      <Box sx={{ display: "flex", gap: "20px" }}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="First name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
        <TextField
          fullWidth
          id="surname"
          name="surname"
          label="Last name"
          value={formik.values.surname}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          error={formik.touched.surname && Boolean(formik.errors.surname)}
          helperText={formik.touched.surname && formik.errors.surname}
        />
      </Box>

      <Box sx={{ display: "flex", gap: "20px" }}>
        <TextField
          id="dob"
          label="Date"
          type="date"
          {...formik.getFieldProps("dob")}
          error={formik.touched.dob && Boolean(formik.errors.dob)}
          helperText={formik.touched.dob && formik.errors.dob}
          sx={{ flex: "1 1 0" }}
          InputLabelProps={{
            shrink: true,
          }}
        />

        <FormControl sx={{ flex: "1 1 0" }}>
          <InputLabel id="demo-simple-select-label">Gender</InputLabel>
          <Select
            name="gender"
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={formik.values.gender}
            label="Gender"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.gender && Boolean(formik.errors.gender)}
            
          >
            <MenuItem value={"male"}>Male</MenuItem>
            <MenuItem value={"female"}>Female</MenuItem>
          </Select>

          <FormHelperText color='error'>
            {formik.touched.gender && formik.errors.gender}
          </FormHelperText>
        </FormControl>
      </Box>
      <EmailInput
        email={formik.values.email}
        handleEmail={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
      />

      <PasswordInput
        password={formik.values.password}
        handlePassword={formik.handleChange}
        onBlur={formik.handleBlur}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}
      />
      {error && <Typography variant='body1' color='error'>{"data" in error ? (error.data as { message?: string }).message || "Unknown error" : "Network error"}</Typography>}
      <Button loading={isLoading} color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
