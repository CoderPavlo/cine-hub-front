import { useFormik } from "formik";
import * as yup from "yup";
import { Button, useTheme, FormControlLabel, Checkbox, Typography } from "@mui/material";

import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";
import { useAppDispatch } from "../../hooks/storeHooks";
import authAPI from "../../store/api/auth";
import { IAuthResponse } from "../../models/auth";
import { setTokens } from "../../store/slices/auth";
import { useNavigate } from "react-router-dom";
import serverAPI from "../../store/api/server";

export default function LoginForm() {
  const [login, { isLoading, error }] = authAPI.useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const validationSchema = yup.object({
    email: yup
      .string()
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string()
      .min(6, "Password should be of minimum 6 characters length")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
    validationSchema: validationSchema,

    onSubmit: async (values) => {
      await login({
        email: values.email,
        password: values.password,
      }).unwrap()
      .then((payload: IAuthResponse) => {
        dispatch(setTokens(payload));
        dispatch(serverAPI.util.invalidateTags(['User']));
        navigate('/home');
      })
      .catch(async (error) => {
        console.log(error);
      })
    },
  });
  const theme=useTheme();
  return (
    <form onSubmit={formik.handleSubmit} className="form" style={{
      background: theme.palette.background.paper,
    }}>
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

      <FormControlLabel control={<Checkbox name="rememberMe" value={formik.values.rememberMe} onChange={formik.handleChange}/>} label="Remember Me" />

      {error && <Typography variant='body1' color='error'>{"data" in error ? (error.data as { message?: string }).message || "Unknown error" : "Network error"}</Typography>}

      <Button loading={isLoading} color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
