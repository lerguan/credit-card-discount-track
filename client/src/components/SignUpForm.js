import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const SignUpForm = () => {
  const [users, setUsers] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);

  useEffect(() => {
    fetch("/users")
      .then((resp) => resp.json())
      .then((data) => {
        setUsers(data);
      });
  }, [refreshPage]);

  const formSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Must enter email"),
    password: yup
      .string()
      .required("Must enter password")
      .min(8, "Password must be at least 8 characters")
      .minLowercase(1, "Password must contain at least one lower case letter")
      .minUppercase(1, "Password must contain at least one upper case letter")
      .minNumbers(1, "Password must contain at least one number")
      .minSymbols(1, "Password must contain at least one special character"),
    image_url: yup.string().url("Optional user profile photo url"),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values, null, 2),
      }).then((resp) => {
        if (resp.status == 200) {
          setRefreshPage(!refreshPage);
        }
      });
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <label htmlFor="email">Email Address</label>
        <br />
        <input id="email" name="email" onChange={formik.handleChange} value={formik.values.email} />
        <p style={{ color: "red" }}>{formik.errors.email}</p>
        <label htmlFor="password">Password</label>
        <br />
        <input id="password" name="password" onChange={formik.handleChange} value={formik.values.password} />
        <p style={{ color: "red" }}>{formik.errors.password}</p>
        <label htmlFor="image_url">User profile photo Url</label>
        <br />
        <input id="image_url" name="image_url" onChange={formik.handleChange} value={formik.values.image_url} />
        <p style={{ color: "red" }}>{formik.errors.image_url}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};
