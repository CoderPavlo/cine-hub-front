import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { Button, Box } from "@mui/material";

import PasswordInput from "./PasswordInput";
import EmailInput from "./EmailInput";

export default function LoginForm() {
  const [error, setError] = useState(null);

  const validationSchema = yup.object({
    email: yup
      .string("Enter your email")
      .email("Enter a valid email")
      .required("Email is required"),
    password: yup
      .string("Enter your password")
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
      console.log("Login USER Values:", values);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className="form">
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

      <label>
        <input
          type="checkbox"
          name="rememberMe"
          checked={formik.values.rememberMe}
          onChange={formik.handleChange}
        />
        Remember Me
      </label>

      {error && <Box sx={{ color: "red" }}>{error}</Box>}

      <Button color="primary" variant="contained" fullWidth type="submit">
        Submit
      </Button>
    </form>
  );
}
