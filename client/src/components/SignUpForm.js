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
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[~!@#$%^&*()])(?=.{8,})/,
        "Must Contain at least 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
      ),
    confirm_password: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords must match"),
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
        if (resp.status === 200) {
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
        <label htmlFor="confirm_password">Confirm Password</label>
        <br />
        <input
          id="confirm_password"
          name="confirm_password"
          onChange={formik.handleChange}
          value={formik.values.confirm_password}
        />
        <p style={{ color: "red" }}>{formik.errors.confirm_password}</p>
        <label htmlFor="image_url">User Profile Photo url(Optional)</label>
        <br />
        <input id="image_url" name="image_url" onChange={formik.handleChange} value={formik.values.image_url} />
        <p style={{ color: "red" }}>{formik.errors.image_url}</p>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default SignUpForm;
