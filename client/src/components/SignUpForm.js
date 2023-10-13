import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const SignUpForm = ({ onLogin }) => {
  const [refreshPage, setRefreshPage] = useState(false);
  const [errors, setErrors] = useState([]);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup
      .string()
      .required("Must enter password")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()])(?=.{8,})/,
        "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => {
            onLogin(user);
            setRefreshPage(!refreshPage);
          });
        } else {
          resp.json().then((err) => setErrors(err.errors));
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        <p style={{ color: "red" }}>{formik.errors.email}</p>
        <br />
        <label htmlFor="password">Password</label>
        <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}>{formik.errors.password}</p>
        <br />
        <label htmlFor="confirm_password">Confirm Password</label>
        <input
          id="confirm_password"
          name="confirm_password"
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
        />
        <p style={{ color: "red" }}>{formik.errors.confirm_password}</p>
        <br />
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default SignUpForm;
