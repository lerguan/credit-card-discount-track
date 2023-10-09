import react, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";

const LoginForm = ({ onLogin }) => {
  const [user, setUser] = useState([{}]);
  const [refreshPage, setRefreshPage] = useState(false);
  const [errors, setErrors] = useState([]);

  const formSchema = yup.object().shape({
    email: yup.string().required().email("Invalid Email Address"),
    password: yup.string().required(),
  });

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formSchema,
    onSubmit: (values) => {
      fetch("login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values, null, 2),
      }).then((resp) => {
        if (resp.ok) {
          resp.json().then((user) => onLogin(user));
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
        <button type="submit">Login</button>
        <div>
          {errors.map((err) => (
            <div key={err}>{err}</div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
